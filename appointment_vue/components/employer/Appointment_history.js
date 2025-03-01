export const AppointmentHistory = {
  data() {
    return {
      searchQuery: "",
      appointments: [],
      staffList: [],
    };
  },
  computed: {
    filteredAppointments() {
      return this.appointments.filter(appointment => {
        const staffName = this.getStaffName(appointment.staff_id).toLowerCase();
        const customerName = appointment.name.toLowerCase();
        const serviceName = appointment.sub_service_name.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        return staffName.includes(query) || customerName.includes(query) || serviceName.includes(query);
      });
    }
  },
  mounted() {
    this.loadData();
    this.loadStaff();
  },
  methods: {

    getStaffName(staff_id) {
      if (!staff_id) return "Not Found"; // Check if staff_id is empty
      let staff = this.staffList.find(staff => staff.staff_id === staff_id);
      return staff ? staff.name : "Not Found";
    },
    loadStaff() {
      let tokenVal = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const url = "http://localhost:8000/api/staffList";
      axios
        .get(url, {
          headers: {
            Authorization: tokenVal,
          },
          params: {
            user_id: user_id,
          },
        })
        .then(async (response) => {
          this.staffList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching list:", error);
        });

    },
    convertToAmPm(time24) {
      let [hours, minutes] = time24.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 for AM case
      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    },

    async loadData() {
      // alert("load ")
      let user_id = localStorage.getItem("user_id");
      // alert(user_id)
      let params = { user_id: user_id, history: 'yes' };
      // if (this.selectedStaff) {
      //   params.staff_id = this.selectedStaff;
      // }
      // alert(params)
      try {
        const url = "http://localhost:8000/api/appointmentList";
        let tokenVal = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: {
            Authorization: tokenVal,
          },
          params: params,
        });

        this.appointments = response.data; // Store the fetched business details
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },

  },
  template: `
    <div class="container-list-history">
      <h2>Appointment List History</h2>
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search by name, mobile, or job role" class="search-box" />
          </div>
      <table class="appointment-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Selected Service</th>
            <th>Contact</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Staff Assigned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client,index in filteredAppointments" :key="index" >
            <td>{{ index + 1}}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.sub_service_name }}</td>
            <td>{{ client.email }}<br>{{ client.phone}}</td>
            <td>{{ client.appointment_date }}</td>
            <td>{{ convertToAmPm(client.appointment_time) }}</td>
            <td>{{ getStaffName(client.staff_id) }}</td>
            <td>
              <button class="delete-btn">🗑</button>
            </td>
          </tr>
          </tbody>
      </table>
    </div>`,
};
