export const ClientCheckout = {
  template: `
 <div class="checkout-container">
        <!-- Left Panel (Form) -->
        <div class="checkout-left-panel">
          <h2 class="checkout-title">Checkout</h2>
          <p class="checkout-info">Appointment held for 10 minutes</p>

          <!-- Contact Info Form -->
          <form @submit.prevent="bookAppointment" class="contact-form">
            <label for="phone-number" class="contact-form-label">Phone number</label>
            <input
              type="text"
              id="phone-number"
              v-model="form.phone"
              class="contact-form-input"
              placeholder="+44 Phone number"
              required
            />

            <label for="name" class="contact-form-label">Enter Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="contact-form-input"
              placeholder="Enter Name"
              required
            />

            <label for="email" class="contact-form-label">E-Mail</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="contact-form-input"
              placeholder="E-Mail"
              required
            />
          </form>

          <!-- Appointment Notes -->
          <div class="appointment-notes-section">
            <label for="notes" class="appointment-notes-label">Appointment Note</label>
            <input
              type="text"
              id="notes"
              v-model="form.notes"
              class="appointment-notes-input"
              placeholder="Enter your appointment note"
            />
            </div>

          <!-- Booking Buttons -->
          <div class="booking-buttons">
            <button @click="bookAppointment" class="btn btn-book">
            Book Appointment</button>
            <button @click="cancelAppointment" class="btn btn-cancel">Cancel</button>
          </div>
        </div>

        <!-- Right Panel (Appointment Details) -->
        <div class="checkout-right-panel">
          <h2 class="checkout-right-title">Appointment Details</h2>
          <div class="appointment-details-card">
            <h3 class="service-name">{{ details.serviceName }}</h3>
            <p class="service-price">{{ details.servicePrice }}</p>
            <h4 class="staff-details-title">Staff Details</h4>
            <p class="staff-name">{{ details.staffName }}</p>
            <h4 class="appointment-time-title">Appointment Time</h4>
            <p class="appointment-time">{{ details.appointmentTime }}</p>
            <h4 class="appointment-description-title">Appointment Description</h4>
            <p class="appointment-description">
              {{ form.note || "No description added yet." }}
            </p>
          </div>
        </div>
      </div>
    `,
  data() {
    return {
      form: {
        phone: "",
        name: "",
        email: "",
        notes: "",
      },
      details: {
        user_id: "",
        staff_id: "",
        sub_service_id: "",
        serviceName: "",
        servicePrice: "",
        appointmentDate: "",
        appointmentTime: "",
      },
    };
  },
  mounted() {
    this.details.user_id = localStorage.getItem("user_id");
    const storedData = localStorage.getItem("selected_services");
    let myservices = "";
    if (storedData) {
      const subServices = JSON.parse(storedData);
      myservices = subServices.map(service => service.sub_service_id).join(",");
    }
    this.details.sub_service_id = myservices;
    this.details.appointmentDate = localStorage.getItem("appointment_date");
    this.details.appointmentTime = localStorage.getItem("appointment_time");
    this.details.staff_id = localStorage.getItem("staff_id");

  },
  methods: {
    addNote() {
      if (this.form.note.trim() === "") {
        alert("Please enter a note!");
        return;
      }
    },
    async bookAppointment() {
      // alert("book")
      localStorage.setItem("name", this.form.name);
      localStorage.setItem("email", this.form.email);
      localStorage.setItem("phone", this.form.phone);
      const url = "http://localhost:8000/api/saveAppointment";
      let message = `🎉 Appointment Booked Successful! 🎉

      Hello *${this.form.name}*,
      
       Your appointment has been BOOKED:
      📅Appointment date : ${this.details.appointmentDate}
      ⏱Appointment Time : ${this.details.appointmentTime}
      📧 Email: ${this.form.email}  
      
      🚀 Thanks to Visit Us !`;

      const data = {
        user_id: this.details.user_id,
        // ,name,email,phone,notes,appointment_date,appointment_time,sub_service_id
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        notes: this.form.notes,
        staff_id: this.details.staff_id,
        appointment_date: this.details.appointmentDate,
        appointment_time: this.details.appointmentTime,
        sub_service_id: this.details.sub_service_id,
      };
      let phone = this.form.phone;
      console.log("data is " + JSON.stringify(data));
      await axios
        .post(url, data, {
          headers: {
            Authorization: "Bearer testing_fix_code",
          },
        })
        .then((response) => {
          alert(response.data.msg)

          let url = `https://wa.me/${phone}?text=${message}`;
          window.open(url, "_blank"); // Open WhatsApp Web

          this.$router.push(`/client/clientbooked`);
        })
        .catch((error) => {
          console.error("Error:", error); // Log the error
          alert("details saved are failed. Please try again."); // Optional alert for user feedback
        });


    },
    cancelAppointment() {
      this.form = {
        phoneNumber: "",
        name: "",
        email: "",
        note: "",
      };
      alert("Appointment booking canceled.");
    },
  },
};
