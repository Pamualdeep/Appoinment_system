export const AddStaff = {
  data() {
    return {
      formdata: {
        staff_id: this.$route.params.id || '',// used for edit 
        name: "",
        mobile: "",
        address: "",
        email: "",
        designation: "",
        job_role: "",
        qualifications: "",
        gender: "",
      },
      subServiceList: [],
      isEditMode: false,
    };
  },
  mounted() {
    // If there's a staff_id in the route, switch to edit mode
    if (this.formdata.staff_id) {
      this.isEditMode = true;
      this.loadData(); // Load existing staff data

    }
    this.loadsubservices();
  },
  methods:
  {
    loadData() {
      // Example endpoint to fetch staff details by ID
      const url = "http://localhost:8000/api/staffList";
      let tokenVal = localStorage.getItem("token");
      let userID = localStorage.getItem("user_id");

      axios
        .get(url, {
          headers: {
            Authorization: tokenVal,
          },
          params: {
            user_id: userID,
            staff_id: this.formdata.staff_id,
          },
        })
        .then((response) => {
          // Fill formdata with fetched details
          const staff = response.data[0];
          this.formdata.name = staff.name;
          this.formdata.mobile = staff.mobile;
          this.formdata.address = staff.address;
          this.formdata.email = staff.email;
          this.formdata.designation = staff.designation;
          this.formdata.job_role = staff.job_role;
          this.formdata.qualifications = staff.qualifications;
          this.formdata.gender = staff.gender;
        })
        .catch((error) => {
          console.error("Error loading staff details:", error);
          alert("Failed to load staff details.");
        });
    },
    saveData() {
      const url = "http://localhost:8000/api/saveStaff";
      let userID = localStorage.getItem("user_id");

      const data = {
        user_id: userID,
        name: this.formdata.name,
        mobile: this.formdata.mobile,
        designation: "Staff",
        gender: this.formdata.gender,
        email: this.formdata.email,
        address: this.formdata.address,
        qualifications: this.formdata.qualifications,
        job_role: this.formdata.job_role,
      };

      // console.log("data is " + JSON.stringify(data));

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
          this.$router.push(`/employer/staff`);
        })
        .catch((error) => {
          console.error("Error:", error); // Log the error
          alert("details saved are failed. Please try again."); // Optional alert for user feedback
        });

    },

    updateData() {
      // Endpoint for updating existing staff
      const url = "http://localhost:8000/api/updateStaff";
      let tokenVal = localStorage.getItem("token");

      const data = {
        staff_id: this.formdata.staff_id,
        name: this.formdata.name,
        mobile: this.formdata.mobile,
        designation: "Staff",
        gender: this.formdata.gender,
        email: this.formdata.email,
        address: this.formdata.address,
        qualifications: this.formdata.qualifications,
        job_role: this.formdata.job_role,
      };

      axios
        .post(url, data, {
          headers: {
            Authorization: tokenVal,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("Data updated");
          this.$router.push(`/employer/staff`);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to update staff details. Please try again.");
        });
    },
    async loadsubservices() {
      const user_id = localStorage.getItem("user_id");
      let tokenVal = localStorage.getItem("token");

      try {
        const url = "http://localhost:8000/api/allSubServices";
        const response = await axios.get(url, {
          headers: {
            Authorization: tokenVal,
          },
          params: {
            user_id: user_id,
          },
        });
        this.subServiceList = response.data;

      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },

  },
  template: `
  <div class="container">
      <div class="staff-form">
        <h2>Add Staff</h2>
        <form>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="formdata.name" placeholder="Text" />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address"  v-model="formdata.address" placeholder="Text" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="phone-number">Phone Number</label>
              <input type="text" id="phone-number"  v-model="formdata.mobile" placeholder="Text" />
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" id="email"  v-model="formdata.email" placeholder="Text" />
            </div>
          </div>
          <div class="form-row">
           <div class="form-group ">
              <label>Gender</label>
              <div class="form-row">
                <label>
                  <input
                    type="radio"
                    value="Male"
                    v-model="formdata.gender"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    v-model="formdata.gender"
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    v-model="formdata.gender"
                  />
                  Other
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="qualification">Qualification</label>
              <input type="text" id="qualification"  v-model="formdata.qualifications" placeholder="Text" />
            </div>
          </div>
         
          <div class="form-row">
            <div class="form-group">
              <label for="jobrole">Job ROle</label>
              <select id="jobrole" v-model="formdata.job_role">
                  <option v-for="service in subServiceList" :key="service.service_id" :value="service.sub_service_name"> {{ service.sub_service_name }}</option>
              </select>
            </div>
          </div>
          
          <button
            type="button"
            class="save-btn"
            @click="isEditMode ? updateData() : saveData()"
          >
            {{ isEditMode ? 'Update' : 'Save' }}
          </button>
        </form>
      </div>
    </div>`,
};
