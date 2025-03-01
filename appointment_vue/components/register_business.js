export const RegisterBusiness = {
  data() {
    return {
      msg: "",
      password: "",
      email: "",
      usernameError: "",
      emailError: "",
      formdata: {
        username: "",
        email: "",
        phone_no: "",
        password: "",
        enteredCaptcha: "",
      },
      showPassword: false, // Toggle state for password visibility
      passwordFieldType: "password", // Input type: password or text
      captcha: "",
    };
  },
  methods: {
    saveData(username, pass, email, phone, captcha) {
      this.formdata.username = username;
      this.formdata.email = email;
      this.formdata.password = pass;
      this.formdata.phone = phone;
      this.formdata.captcha = captcha;
      // Save this data in localStorage
      localStorage.setItem("formdata", JSON.stringify(this.formdata));
      console.log(this.formdata);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Toggle the state
      this.passwordFieldType = this.showPassword ? "text" : "password"; // Change input type
    },
    registerUser() {
      // if (this.formdata.enteredCaptcha !== this.captcha) {
      //   alert("Captcha does not match!");
      //   this.refreshCaptcha();
      //   return;
      // }
      let number = this.formdata.phone_no; // Remove non-numeric characters
      let message = `🎉 Registration Successful! 🎉

      Hello *${this.formdata.username}*,
      
      Thank you for registering with us! Your details are:
      
      📧 Email: ${this.formdata.email}  
      📞 Phone: ${this.formdata.phone_no}  
      
      Your account has been successfully created. 🎊
      
      We look forward to serving you. Let us know if you need any assistance.
      
      🚀 Best Regards!`;

      if (!this.formdata) {
        // Check if email or password is empty
        alert("Please enter Email and Password");
      } else {
        const url = "http://localhost:8000/api/saveUser";
        const data = {
          first_name: this.formdata.first_name,
          last_name: this.formdata.last_name,
          dob: this.formdata.dob,
          address: this.formdata.address,
          username: this.formdata.username,
          email: this.formdata.email,
          password: this.formdata.password,
          phone: this.formdata.phone_no,
        };

        // Use axios for HTTP request
        axios
          .post(url, data, {
            headers: {
              Authorization: "Bearer testing_fix_code",
            },
          })
          .then((response) => {
            this.msg = response.data.msg;
            console.log(response.data);
            alert(response.data.msg); // Alert the message from the response if needed

            let url = `https://wa.me/${number}?text=${message}`;
            window.open(url, "_blank"); // Open WhatsApp Web

            this.formdata.username = "";
            this.formdata.email = "";
            this.formdata.password = "";
            this.formdata.phone_no = "";
            this.formdata.captcha = "";
          })
          .catch((error) => {
            console.error("Error:", error); // Log the error
            alert("Register Failed. Please try again."); // Optional alert for user feedback
          });
      }
    },

    generateCaptcha() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let captcha = "";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captcha += characters[randomIndex];
      }
      return captcha;
    },
    refreshCaptcha() {
      this.captcha = this.generateCaptcha();
    },
    register() {
      if (this.enteredCaptcha !== this.captcha) {
        alert("Captcha does not match!");
        this.refreshCaptcha();
        return;
      }
      alert("Registration successful!");
    },
    login() {
      alert("Login successful!");
    },
    validateUsername() {
      if (!this.formdata.username.trim()) {
        this.usernameError = "Username can not be empty.";
      } else if (this.formdata.username.trim().length < 2) {
        this.usernameError = "Username must contain at least 2 characters.";
      } else {
        this.usernameError = ""; // Clear the error when valid
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.formdata.email.trim()) {
        this.emailError = "Email cannot be empty.";
      } else if (!emailPattern.test(this.formdata.email)) {
        this.emailError = "Please enter a valid email address.";
      } else {
        this.emailError = ""; // Clear the error when valid
      }
    },
  },
  mounted() {
    this.refreshCaptcha();
  },
  template: `
    <div class="auth-section flex w75 justify_around">
      <div class="register-form w50">
        <div class="register-header w80 m-auto">
          <h2>Register</h2>
        </div>
        <form class="w100">
          <div class="form-group w100">
            <input class="w100" type="text" placeholder="Username" v-model="formdata.username" @blur="validateUsername"/>
            <p v-if="usernameError" class="error-message">{{ usernameError }}</p>
          </div>
          <div class="form-group">
            <input class="w100" type="email" placeholder="Email" v-model="formdata.email" @blur = "validateEmail"/>
            <p v-if ="emailError" class = "error-message"> {{ emailError}} </p>
          </div>
          <div class="form-group">
            <input class="w100" type="text" placeholder="Phone No." v-model="formdata.phone_no" />
          </div>
          <div class="form-group password-group w100 flex items-center">
            <input class="w80" :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="formdata.password" />
            <button
              type="button"
              class="toggle-password-btn w10"
              @click="togglePasswordVisibility"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
          <div class="form-group captcha flex w100">
            <input
              class="w50"
              type="text"
              placeholder="Enter Captcha"
              v-model="formdata.enteredCaptcha"
            />
            <span id="captcha-display">{{ captcha }}</span>
            <button type="button" class="refresh-btn" @click="refreshCaptcha">
              ↻
            </button>
          </div>
          <button type="submit" class="submit-btn" @click="registerUser">Register</button>
          <p>Already have an account? <a href="#">Login</a></p>
          <div v-if="msg!=''" class="message">
            <h3>{{ msg }}</h3>
          </div>
        </form>
      </div>

     </div>`,
};
