export const ClientServices = {
  template: `
    <div class="client_service_container">
        <h1 class="title">Choose Services</h1>
        <div class="services">
          <div
            v-for="(service, index) in services"
            :key="index"
            :class="['service-card', { selected: selectedService === index }]"
            @click="selectService(index)"
            >
            <div class="service-icon">
              <h2>{{ service.service_name }}</h2>
              📅
            </div>
            <p>{{ service.description }}</p>
            <router-link :to="'/client/clientsubservice/'+ service.service_id" class="textdecoration">
            Next
            </router-link>

          </div>
        </div>
    </div>
    `,
  data() {
    return {
      user_id: this.$route.params.userid || "",
      services: [],
      selectedService: null,
    };
  },
  mounted() {
    // this.loadAllbusinessdetails(); // Load business details on component mount
    this.loadservices();
  },
  methods: {
    selectService(index) {
      this.selectedService = index; // Update the selected service
    },
    async loadservices() {
      // let business_id = localStorage.getItem("business_id");
      let user_id = this.$route.params.userid || "";
      localStorage.setItem("user_id",user_id);
      try {
        const url = "http://localhost:8000/api/userServices";
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer testing_fix_code",
          },
          params: {
            // business_id: business_id,
            user_id: user_id,
          },
        });

        this.services = response.data; // Store the fetched business details
        console.log("Business details loaded:", this.services);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },
  },
};
