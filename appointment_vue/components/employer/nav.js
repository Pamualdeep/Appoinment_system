export const AdminNav = {
  data() {
    return {
      user: '',
    };
  },
  mounted() {
    this.user = localStorage.getItem("username")
  },
  methods: {
    logoutUser() {
      // this.$store.dispatch("logout");
      console.log("logout");
      this.$router.push({ path: "/" });
      localStorage.clear();
    },
  },
  template: `
    <nav class="navbar flex w100 justify_between">
      <div class="logo flex">
        <img src="../images/book-an-appointment.png" alt="Creative Agency Logo" />
        <h2 style="text-transform:capitalize;"> Welcome {{ user }}</h2>
        </div>
      <div class="navbar-links w50 flex justify_end">
        <button class="reset-password">Reset Password</button>
        <div class="profile-dropdown">
        
          <button class="profile-btn"><i class="fa fa-caret-down"></i>Profile</button>
          <div class="dropdown-content">
            <router-link to="/employer/UserDetail">User Profile</router-link>
            <router-link to="/employer/BusinessDetail">Business Profile</router-link>
          </div>
        </div>
        <button class="logout-btn"  @click="logoutUser">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>Logout
        </button>
      </div>
    </nav>`,
};
