
export const Homelogin = {
  data() {
    return {
      msg: "",
      password: "",
      email: "",
      showPassword: false, // Toggle state for password visibility
      passwordFieldType: "password", // Input type: password or text
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Toggle the state
      this.passwordFieldType = this.showPassword ? "text" : "password"; // Change input type
    },

    validateUser() {
      if (!this.email || !this.password) {
        // Check if email or password is empty
        alert("Please enter Email and Password");
      } else {
        // const url = "https://techebiz.com/student_guide/api/loginUser";
        const url = "http://localhost:8000/api/userLogin";
        const data = {
          email: this.email,
          password: this.password,
        };
        console.log("data is : " + JSON.stringify(data));
        // Use axios for HTTP request
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer testing_fix_code",
            },
            params: data,
          })
          .then((response) => {
            let res = response.data;
            console.log("res data is " + JSON.stringify(res.data));
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("user_id", res.data.user_id);
            // localStorage.setItem("user_id", res.user_id);
            console.log("response is : " + JSON.stringify(res));

            if (res.length == 0) {
              console.log("no data");
              alert("Invalid Email or Password");
            } else if (res.error == "1") {
              alert(res.data.msg + res.error);
            } else {
              console.log("data is : " + JSON.stringify(res));
              this.$router.push(`/employer/adminappointment`);
            }
            // console.log(response.data);
            // console.log("response is : " + JSON.stringify(response));
            // alert("login successfull"); // Alert the message from the response if needed
          })
          .catch((error) => {
            console.error("Error:", error); // Log the error
            alert("Login failed. Please try again."); // Optional alert for user feedback
          });
      }
    },

  },

  template: `
    <div class="auth-section flex w75 justify_around">
      
      <div class="login-form w35">
        <div class="login-header w80 m-auto">
          <h2>Login</h2>
        </div>
        <form class="w100">
          <div class="form-group w100">
            <input class="w100" type="text" placeholder="Email" v-model="email"/>
          </div>
          <div class="form-group w100">
            <input class="w100" type="password" placeholder="Password" v-model="password"/>
          </div>
          <button type="submit" class="submit-btn" @click="validateUser">Login</button>
          <p><a href="#">Forgot Password?</a></p>
          <p>Don’t have an account? <a href="#">Register</a></p>
        </form>
      </div>
    </div>`,
};
