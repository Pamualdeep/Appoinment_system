// import { AdminSubService } from "./SubService.js";
import { Message } from "./Message.js";
export const AdminServices = {
  data() {
    return {
      searchQuery: "",
      selectedSubService: null, // Define the property
      serviceName: "",
      serviceDescription: "",
      services: [],
      subserviceList: [],
      formdata: {
        service_name: "",
        description: "",
        business_id: 1,
      },
      isEditing: false,
      currentServiceIndex: null,
      showPopup: false, // Controls popup visibility
      selectedSubService: null, // Define the selectedSubService property
    };
  },
  components: {
    // AdminSubService,
    Message, // Register the child component
  },
  mounted() {
    this.loadServices();
  },
  computed: {
    filteredServices() {
      // alert("load")
      if (!this.searchQuery.trim()) {
        // alert(this.staffList.length)
        return this.services; // Show all staff if search query is empty
      }
      let query = this.searchQuery.toLowerCase();
      return this.services.filter((service) => {
        return (
          service.service_name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.subServices.some(
            (subService) =>
              subService.sub_service_name.toLowerCase().includes(query) ||
              subService.price.toLowerCase().includes(query) ||
              subService.duration.toLowerCase().includes(query)
          )
        );
      });
      // alert(this.staffList.length)
    },
  },
  methods: {
    loadServices() {
      let tokenVal = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const url = "http://localhost:8000/api/serviceList";
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
          this.services = response.data;

          // Load sub-services for each service
          await this.loadAllSubServices();
        })
        .catch((error) => {
          console.error("Error fetching services list:", error);
        });
    },

    async loadAllSubServices() {
      let tokenVal = localStorage.getItem("token");

      // Use Promise.all to load sub-services for all services
      const subServicePromises = this.services.map((service) => {
        const url = "http://localhost:8000/api/subServiceList";
        return axios
          .get(url, {
            headers: {
              Authorization: tokenVal,
            },
            params: {
              service_id: service.service_id, // Adjust based on your service object structure
            },
          })
          .then((response) => {
            console.log("service id" + service.service_id);
            // Add sub-services to the service object
            service.subServices = response.data;
          })
          .catch((error) => {
            console.error(
              `Error fetching sub-services for service ID ${service.id}:`,
              error
            );
            service.subServices = []; // Fallback to an empty array if the request fails
          });
      });

      // Wait for all sub-service fetches to complete
      await Promise.all(subServicePromises);

      console.log("All sub-services loaded:", this.services);
    },

    saveData() {
      if (!this.formdata) {
      } else {
        const url = "http://localhost:8000/api/saveService";
        let userID = localStorage.getItem("user_id");

        const data = {
          user_id: userID,
          service_name: this.formdata.service_name,
          description: this.formdata.description,
          business_id: this.formdata.business_id,
        };

        console.log("data is " + JSON.stringify(data));

        let tokenVal = localStorage.getItem("token");
        axios
          .post(url, data, {
            headers: {
              Authorization: tokenVal,
            },
          })
          .then((response) => {
            console.log(response.data);
            alert("Data saved"); // Alert the message from the response if needd
            this.formdata.service_name = "";
            this.formdata.description = "";
            this.loadServices();
            this.$router.push(`/employer/services`);
          })
          .catch((error) => {
            console.error("Error:", error); // Log the error
            alert("details saved are failed. Please try again."); // Optional alert for user feedback
          });
      }
    },

    closePopup() {
      this.showPopup = false; // Hide popup
    },
    resetForm() {
      this.serviceName = "";
      this.serviceDescription = "";
      this.isEditing = false;
      this.currentServiceIndex = null;
    },
  },
  template: `
      <div class="admin-services-container">
        <h2>Service</h2>
      
        <form class="form" >
          <label for="service-name">Service Name</label>
          <input
            type="text"
            id="service-name"
            v-model="formdata.service_name"
            placeholder="Social Media Marketing"
          />
          <label for="service-description">Description</label>
          <textarea
            id="service-description"
            v-model="formdata.description"
            placeholder="Description"
          ></textarea>
    <br>
          <button type="button" class="save-btn" @click="saveData">{{ isEditing ? "Update" : "Save" }}</button>
        </form>

          <div v-if="services.length>0" style="margin-left:20%" class="w50 search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search by name, mobile, or job role" class="search-box" />
          </div>
        <!-- Service List -->
        <div class="service-card-list">
          <div
            v-for="(service, index) in filteredServices"
            :key="index"
            class="service-item"
          >
          <div class="row justify_between">
              <h3>{{ index + 1 }}. {{ service.service_name }}</h3>
              <router-link :to="'/employer/addsubservice/'+ service.service_id+'/'+service.service_name">+Sub-Service</router-link>
            </div>


            <!-- Sub-Services Table -->
            <table class="table">
              <thead>
                <tr>
                <th>Sno</th>
                  <th>Sub-Services</th>
                  <th>Price</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(subService,subIndex ) in service.subServices" :key="subService.id">
                  <td>{{ subIndex + 1 }}</td>
                  <td>{{ subService.sub_service_name }}</td>
                  <td>{{ subService.price }}</td>
                  <td>{{ subService.duration }}</td>
                 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Popup for adding sub-services -->
         <div v-if="showPopup" class="popup-overlay">
  
      </div>
          
      </div>
    `,
};
