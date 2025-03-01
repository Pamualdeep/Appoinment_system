export const ServiceBooked = {
  data(){
    return{
      details:{
        appointment_date: "",
        appointment_time: "",
        name: "",
        email: "",
        phone: "",
        service_list: [],
      },
    };
  },
  mounted(){
    // alert("dfd")
    this.details.appointment_date = localStorage.getItem("appointment_date");
    this.details.appointment_time = localStorage.getItem("appointment_time");
    this.details.name = localStorage.getItem("name");
    this.details.email = localStorage.getItem("email");
    this.details.phone = localStorage.getItem("phone");
    const storedData = localStorage.getItem("selected_services");
    if (storedData) {
      this.details.service_list = JSON.parse(storedData);
    }


  },
  template: `
    <div class="client_booked_container">
      <main class="content">
        <div class="success-icon">
          <img src="../../images/tick.png" alt="Success Icon" />
        </div>
        <h1>Hi {{details.name}}! <span>👋</span></h1>
        <p>Your Appointment Booked Successfully!</p>
        <p>We Have Sent your Booking Information To Your E-mail Address {{ details.email }}</p>

        <div class="appointment-detail">
          <h2>Appointment Detail:</h2>
          <div class="detail-box">
            <h3>Saloon Appointment</h3>
            <p v-for="item in details.service_list" :key="item.sub_service_id">{{ item.sub_service_name}} ($ {{item.price}}+)</p>
            <div class="appointment-meta">
              <p><span>📅</span> {{ details.appointment_date}}</p>
              <!--p><span>⏱</span> 1 hr</!--p-->
              <p><span>🕒</span> {{ details.appointment_time}}</p>
            </div>
          </div>
        </div>

        <p>Thanks for Joining Us! <span>👍</span></p>

        <router-link to="/" class="textdecoration"><button class="new-appointment">Book New Appointment</button></router-link>
      </main>
    </div>`,
};
