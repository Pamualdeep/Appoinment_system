export const UserDetail = {
  data() {
    return {
      password: "",
      email: "",
      formdata: {
        user_id: localStorage.getItem("user_id") || "",
        first_name: "",
        last_name: "",
        dob: "12-05-2000",
        username: "",
        phone: "",
        address: "",
        website: "",
      },
      saveBusiness: [], // Array to store business details
    };
  },
  mounted() {
    this.loadUserDetails(); // Load user details on component mount
  },
  methods: {
    saveData(event) {
      event.preventDefault(); // Prevent default form submission

      // Check if form data is complete
      if (
        !this.formdata.first_name ||
        !this.formdata.last_name ||
        !this.formdata.email
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const url = "http://localhost:8000/api/updateUser";
      let userID = localStorage.getItem("user_id");

      const data = {
        user_id: userID,
        first_name: this.formdata.first_name,
        last_name: this.formdata.last_name,
        dob: this.formdata.dob,
        email: this.formdata.email,
        phone: this.formdata.phone,
        address: this.formdata.address,
      };

      // Use axios for HTTP request
      let tokenVal = localStorage.getItem("token");
      axios
        .post(url, data, {
          headers: {
            Authorization: tokenVal,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("Profile updated successfully!");
          this.saveBusiness.push(response.data); // Optionally save response to business array
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to update profile. Please try again.");
        });
    },

    async loadUserDetails() {
      let tokenVal = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      try {
        const url = "http://localhost:8000/api/getUser";
        const response = await axios.get(url, {
          headers: {
            Authorization: tokenVal,
          },
          params: {
            user_id: user_id,
          },
        });

        this.formdata = response.data; // Store the fetched user details
        console.log("User details loaded:", response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    },
  },
  template: `
    <div class="container-user w50 m-auto">
      <div class="user-details-form">
        <h2>Fill User Details</h2>
        <form @submit.prevent="saveData">
          <div class="form-row flex">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                v-model="formdata.first_name"
                placeholder="Enter Your Name"
              />
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                v-model="formdata.last_name"
                placeholder="Enter Your Name"
              />
            </div>
          </div>

          <div class="form-row flex">
            <div class="form-group">
              <label for="dob">D.O.B</label>
              <input
                type="date"
                id="dob"
                v-model="formdata.dob"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <textarea
                id="address"
                v-model="formdata.address"
                rows="3"
                placeholder="Enter Your Address"
              ></textarea>
            </div>
          </div>

          <div class="form-row flex">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="email"
                id="email"
                v-model="formdata.email"
                placeholder="Enter Your e-mail"
              />
            </div>
            <div class="form-group">
              <label for="phone-number">Phone Number</label>
              <input
                type="text"
                id="phone-number"
                v-model="formdata.phone"
                placeholder="Enter Your Phone Number"
              />
            </div>
          </div>

          <button type="submit" class="update-btn">Update Profile</button>
        </form>
      </div>
    </div>`,
};
