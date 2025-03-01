export const ClientSubService = {
  template: `
    <div class="client_sub_service_container">
      <div class="left-panel">
        <h1 class="title">Saloon Appointment</h1>
        <h2 class="sub-title">Choose Sub-Service</h2>
        <table class="service-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in services" :key="index">
              <td>{{ service.sub_service_name }}</td>
              <td>{{ service.price }}</td>
              <td>{{ service.duration }}</td>
              <td>
                <input
                  type="checkbox"
                  :id="'service-checkbox-' + index"
                  v-model="service.selected"
                  @change="selectOnlyOne(service)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button :disabled="!selectedServices.length" class="next-btn">
          <router-link to="/client/clientdate" class="textdecoration">Next</router-link>
        </button>
      </div>

      <div class="right-panel">
        <h2>Appointment Details</h2>
        <div class="appointment-details">
          <div class="appointment-header">
            <h3>{{ appointmentTitle }}</h3>
            <p>{{ totalPrice }}</p>
          </div>
          <ul>
            <li v-for="(service, index) in selectedServices" :key="index">
              {{ service.sub_service_name }} ({{ service.price }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.loadsubservices();
    this.loadSelectedServices();
  },
  computed: {
    selectedServices() {
      return this.services.filter((service) => service.selected);
    },
    totalPrice() {
      const total = this.selectedServices.reduce(
        (sum, service) =>
          sum + parseInt(service.price.replace("$", "").replace("+", "")),
        0
      );
      return `$${total}+`;
    },
    appointmentTitle() {
      return this.selectedServices.length
        ? `${this.selectedServices.length} Service(s) Selected`
        : "No Service Selected";
    },
  },
  methods: {
    async loadsubservices() {
      let myservice_id = this.$route.params.serviceid || "";
      localStorage.setItem("service_id", myservice_id);

      try {
        const url = "http://localhost:8000/api/guestSubServiceList";
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer testing_fix_code",
          },
          params: {
            service_id: myservice_id,
          },
        });

        this.services = response.data.map((service) => ({
          ...service,
          selected: false,
        }));

        this.loadSelectedServices();
        console.log("Business details loaded:", this.services);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },
    selectOnlyOne(selectedService) {
      this.services.forEach((service) => {
        service.selected = service === selectedService;
      });
      this.updateSelection();
    },
    updateSelection() {
      localStorage.setItem(
        "selected_services",
        JSON.stringify(this.selectedServices)
      );
    },
    loadSelectedServices() {
      const storedServices =
        JSON.parse(localStorage.getItem("selected_services")) || [];
      this.services.forEach((service) => {
        service.selected = storedServices.some(
          (s) => s.sub_service_name === service.sub_service_name
        );
      });
    },
  },
};
