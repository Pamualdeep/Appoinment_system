export const BusinessDetail = {
  data() {
    return {
      password: "",
      email: "",
      formdata: {
        user_id: localStorage.getItem("user_id") || "",
        business_name: "",
        business_type: "",
        email: "",
        phone: "",
        alternate_phone: "",
        address: "",
        website: "",
      },
    };
  },
  mounted() {
    // this.loadAllbusinessdetails(); // Load business details on component mount
    this.loadAllbusinessdetails();
  },
  methods: {
    async loadAllbusinessdetails() {
      let tokenVal = localStorage.getItem("token");
      // let business_id = localStorage.getItem("business_id");
      let user_id = localStorage.getItem("user_id");

      try {
        const url = "http://localhost:8000/api/getBusinessInfo";
        const response = await axios.get(url, {
          headers: {
            Authorization: tokenVal,
          },
          params: {
            // business_id: business_id,
            user_id: user_id,
          },
        });

        this.formdata = response.data; // Store the fetched business details
        console.log("Business details loaded:", this.businessdetail);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },

    // ... other methods ...
    async saveData() {
      // if (this.formdata.enteredCaptcha !== this.captcha) {
      //   alert("Captcha does not match!");
      //   this.refreshCaptcha();
      //   return;
      // }
      if (!this.formdata) {
        alert("Please enter Details");
      } else {
        const url = "http://localhost:8000/api/saveBusiness";
        let userID = localStorage.getItem("user_id");

        const data = {
          user_id: userID,
          business_name: this.formdata.business_name,
          business_type: this.formdata.business_type,
          email: this.formdata.email,
          password: this.formdata.password,
          phone: this.formdata.phone,
          alternate_phone: this.formdata.alternate_phone,
          address: this.formdata.address,
          website: this.formdata.website,
        };

        // Use axios for HTTP request
        let tokenVal = localStorage.getItem("token");
        axios
          .post(url, data, {
            headers: {
              // Authorization: "Bearer testing_fix_code",
              // Authorization: localToken,
              Authorization: tokenVal,
            },
          })
          .then((response) => {
            console.log(response.data);
            alert("details saved"); // Alert the message from the response if needed
            this.loadAllbusinessdetails();
          })
          .catch((error) => {
            console.error("Error:", error); // Log the error
            alert("details saved are failed. Please try again."); // Optional alert for user feedback
          });
      }
    },
  },
  template: `
    <div class="business-container w80 flex">
      <div class="business-details-form flex">
       <form class="flex w50">
        <div class="form-row flex w100 flex-column">
         <h2>Fill Business Details</h2>
            <div class="form-group">
              <label for="business-name">Business Name</label>
              <input
                type="text"
                id="business-name"
                v-model="formdata.business_name" 
                placeholder="Enter Business Name"
              />
            </div>
            <div class="form-group">
              <label for="business-type">Business Type</label>
              <input
                type="text"
                id="business-type"
                v-model="formdata.business_type"
                placeholder="Enter Business Type"
              />
            </div>
          <!---</div>-->

          <!---<div class="form-row flex">-->
            <div class="form-group">
              <label for="phone-number">Phone Number</label>
              <input
                type="text"
                id="phone-number"
                v-model="formdata.phone"
                placeholder="Enter Phone Number"
              />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <textarea
                id="address"
                v-model="formdata.address"
                rows="3"
                placeholder="Enter Address"
              ></textarea>
            </div>
          <!---</div>-->

          <!---<div class="form-row flex">-->
            <div class="form-group">
              <label for="additional-phone">Additional Phone Number</label>
              <input
                type="text"
                id="additional-phone"
                v-model="formdata.alternate_phone"
                placeholder="Enter Additional Phone Number"
              />
            </div>
            <div class="form-group">
              <label for="website">Website</label>
              <input
                type="text"
                id="website"
                v-model="formdata.website"
                placeholder="Enter Website Name"
              />
            </div>
          <!---</div>-->

          <!---<div class="form-row">-->
            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" id="email" 
              v-model="formdata.email"
              placeholder="Enter E-mail" />
            </div>
            <button type="submit" class="update-btn" @click="saveData">Save Details</button>
          </div>

        </div>
      </form>
    </div>
    </div>

</div>`,
};
