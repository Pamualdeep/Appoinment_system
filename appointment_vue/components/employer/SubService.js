export const AdminSubService = {
  name: "AdminSubService",
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      service_id: this.$route.params.sid || "",
      service_name: this.$route.params.name || "",
      selectedStaff: null,
      staffList: [],
      subServices: [],
      formdata: {
        name: "",
        price: "",
        duration: "",
      },
      subServicesList: [],
    };
  },
  mounted() {
    this.loadAllSubServices();
    this.loadStaff();
  },
  methods: {
    async loadAllSubServices() {
      let tokenVal = localStorage.getItem("token");
      try {
        const url = `http://localhost:8000/api/subServiceList?service_id=${this.service_id}`;

        const response = await axios.get(url, {
          headers: { Authorization: tokenVal },
        });

        this.subServices = response.data;
      } catch (error) {
        console.error("Error fetching sub-services:", error);
      }
    },

    async saveData() {
      this.loading = true;
      if (
        !this.formdata.name ||
        !this.formdata.price ||
        !this.formdata.duration
      ) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const url = "http://localhost:8000/api/saveSubService";
        let tokenVal = localStorage.getItem("token");

        const data = {
          service_id: this.service_id,
          sub_service_name: this.formdata.name,
          price: this.formdata.price,
          duration: this.formdata.duration,
          staff_id: this.selectedStaff,
        };

        await axios.post(url, data, {
          headers: { Authorization: tokenVal },
        });

        alert("Details saved successfully!");
        this.loading = false;
        this.formdata.name = "";
        this.formdata.price = "";
        this.formdata.duration = "";
        this.selectedStaff = null;
        this.loadAllSubServices(); // Reload the list after saving
      } catch (error) {
        console.error("Error saving sub-service:", error);
        alert("Failed to save details. Please try again.");
      }
    },

    closePopup() {
      this.$router.push(`/employer/services`);
    },
    loadStaff() {
      let user_id = localStorage.getItem("user_id");
      let tokenVal = localStorage.getItem("token");
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
  },
  template: `
    <div class="add-sub-service">
      <div class="row justify_between">
      <h2>Add Sub-Service </h2>
        <h2>Service Name : {{ service_name }}</h2>
      </div>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Sub-Service Name</th>
                <th>Price($)</th>
                <th>Duration in Minutes</th>
                <th>Staff Assigned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" v-model="formdata.name" placeholder="Enter name" />
                </td>
                <td>
                  <input type="text" v-model="formdata.price" placeholder="Enter price" />
                </td>
                <td>
                  <input type="text" v-model="formdata.duration" placeholder="60 min" />
                </td>
                <td>
                    <select v-model="selectedStaff" >
                        <option v-for="staff in staffList" :value="staff.staff_id" :key="staff.staff_id">{{ staff.name }}-{{staff.job_role}}</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                <p v-if="loading == true" style="background: #eee; padding:.25rem;text-align:center">Saving...</p>
                <button class="save-btn" @click="saveData">Save</button>
        <button class="cancel-btn" @click="closePopup">Cancel</button></td>

              </tr>
            </tbody>
          </table>
        </div>
        <div class="details-wrapper">
        <p style="text-align:right">Record Found - {{subServices.length}}</p>
        <table class="table">

          <thead>
            <tr>
              <td>Sno.</td>
              <td>Sub Service Name</td>
              <td>Price</td>
              <td>Duration </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subService, index) in subServices" :key="index" class="sub-services-row">
              <td class="sub-services-cell" >{{index +1}}</td>
              <td class="sub-services-cell" >{{subService.sub_service_name}}</td>
              <td class="sub-services-cell" >{{subService.price}}</td>
              <td class="sub-services-cell" >{{subService.duration}}</td>
            </tr>
          </tbody>
        </table>
        </div>
        
    </div>
  `,
};
