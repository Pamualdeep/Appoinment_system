export const Staff = {
  data() {
    return {
      searchQuery: "",
      staffList: [],

    };
  },
  // all function loaded on page load
  mounted() {
    this.loadData();

  },
  computed: {
    filteredStaff() {
      // alert("load")
      if (!this.searchQuery.trim()) {
        // alert(this.staffList.length)
        return this.staffList; // Show all staff if search query is empty
      }
      let query = this.searchQuery.toLowerCase();
      return this.staffList.filter((staff) => {
        return (
          staff.name.toLowerCase().includes(query) ||
          staff.mobile.includes(query) ||
          staff.job_role.toLowerCase().includes(query)
        );
      });
      // alert(this.staffList.length)
    },
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
          let list = response.data;
          this.staffList = list.filter((staff) => staff.status !== "deleted");
          // alert("staffList", this.staffList.length);
        })
        .catch((error) => {
          console.error("Error fetching list:", error);
        });

    },
    deleteStaff(staff_id) {
      // alert("delete");
      // alert("staff_id", staff_id);
      let tokenVal = localStorage.getItem("token");
      const url = "http://localhost:8000/api/updateStatus";
      axios
        .post(url, {
          staff_id: staff_id,
          status: "deleted",
        },
          {
            headers: {
              Authorization: tokenVal,
            },
          })
        .then((response) => {
          alert(response.data.msg);

          this.loadData();
        })
        .catch((error) => {
          console.error("Error deleting staff:", error);
        });
    },
  },
  template: `

    <div class="conatiner">
    <h1>Staff</h1>
      <div class="wrapper-row justify_between">
        
          <button class="submit-btn">
              <router-link to="/employer/addstaff">  
                  <span>+ Add Staff</span>
              </router-link>
          </button>

          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search by name, mobile, or job role" class="search-box" />
          </div>
       
      </div>

        <table class="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Mobile No.</th>
              <th>Designation</th>
              <th>Job Role</th>
              <th>Qualification</th>
              <th>Address</th>
              <th>Email ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in filteredStaff" :key="index">
              <td>{{ index+1}}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.mobile }}</td>
              <td>{{ item.designation }}</td>
              <td>{{ item.job_role }}</td>
              <td>{{ item.qualifications }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.email }}</td>
              <td>
                <button class="edit-btn">
                    <router-link :to="'/employer/addstaff/'+ item.staff_id">✎</router-link>
                </button>
                <button class="delete-btn" @click="deleteStaff(item.staff_id)">🗑</button>
              </td>
            </tr>
            </tbody>
        </table>
     
    </div>`,
};
