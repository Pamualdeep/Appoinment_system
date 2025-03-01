export const BusinessList = {
  template: `
    <div class="cards-section">
      <h2>Listed and Verified Businesses</h2>
              <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search by name, mobile, or job role" class="search-input" />
          </div>   
      <div class="cards flex">
        <div
          class="card"
          v-for="(card, index) in userBusinessList"
          :key="index"
        >
          <router-link :to="'/client/clientservice/'+ card.user_id" class="textdecoration">
            <img src="./images/image.png" :alt="card.business_" />
            <h3>{{ card.business_name }}</h3>
            <p>{{ card.business_type }}<br />{{ card.organization }}</p>
          </router-link>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      searchQuery: "",
      userBusinessList: [],
    };
  },
  mounted() {
    localStorage.clear();
    // this.loadAllbusinessdetails(); // Load business details on component mount
    this.loadAllbusinessdetails();
  },
  computed: {
    filteredStaff() {
      // alert("load")
      if (!this.searchQuery.trim()) {
        // alert(this.staffList.length)
        return this.appointmenthistory; // Show all staff if search query is empty
      }
      let query = this.searchQuery.toLowerCase();
      return this.appointmenthistory.filter((staff) => {
        return (
          staff.name.toLowerCase().includes(query) ||
          staff.Contact.includes(query) ||
          staff.Date_Time.toLowerCase().includes(query)
        );
      });
      // alert(this.staffList.length)
    },
  },
  methods: {
    async loadAllbusinessdetails() {
      // let tokenVal = localStorage.getItem("token");
      // let business_id = localStorage.getItem("business_id");
      // let user_id = localStorage.getItem("user_id");

      try {
        const url = "http://localhost:8000/api/listbusiness ";
        const response = await axios.get(url, {
          // headers: {
          //   Authorization: tokenVal,
          // },
          // params: {
          //   // business_id: business_id,
          //   user_id: user_id,
          // },
        });

        this.userBusinessList = response.data; // Store the fetched business details
        console.log("Business details loaded:", this.userBusinessList);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },
  },
};
