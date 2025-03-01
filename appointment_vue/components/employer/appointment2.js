export const AdminAppointment2 = {
  template: `
      <div class="appointment_container">
        <h2>Appointment</h2>
        <div class="filter">
          <select v-model="selectedUser" class="user-dropdown">
            <option v-for="user in users" :key="user">{{ user.name }}</option>
          </select>
        </div>
        <div id="calendar"></div>
      </div>
    `,
  data() {
    return {
      users: [],
      calendar: null,
      events: [],
    };
  },

  methods: {
    loadData() {
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
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching list:", error);
        });

    },
    loadAppointments() {
      let tokenVal = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const url = "http://localhost:8000/api/appointmentList";
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
          this.list = response.data;
        })
        .catch((error) => {
          console.error("Error fetching list:", error);
        });

    },
    initializeCalendar() {
      const calendarEl = document.getElementById("calendar");
      this.calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [
          {
            title: "Kanwaljeet",
            start: "2025-01-10T15:45:00",
            color: "red",
          },
          {
            title: "+2 more",
            start: "2025-01-07",
            display: "background",
          },
          {
            title: "+3 more",
            start: "2025-01-08",
            display: "background",
          },
        ],
      });

      this.calendar.render();
    },
    updateCalendar() {
      // Logic to update calendar based on the selected user
      alert(`Displaying appointments for: ${this.selectedUser}`);
      // You can fetch and load events dynamically here based on `selectedUser`
    },
  },
  watch: {
    selectedUser() {
      this.updateCalendar();
    },
  },
  mounted() {
    this.initializeCalendar();
    this.userName = localStorage.getItem("userName");
  },
};
