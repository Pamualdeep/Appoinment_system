export const Message = {
    props:["name","email","mobile"],
    template:`
    <div class="client_booked_container">
      <main class="content">
        <div class="success-icon">
          <img src="./images/tick.png" alt="Success Icon" />
        </div>
        <h1>Hi {{details.name}}! <span>👋</span></h1>
        <p>Your Successfully Registered !</p>
        <p>We Have Sent your Booking Information To Mobile.</p>

        
        <p>Thanks for Joining Us! <span>👍</span></p>

        <router-link to="/" class="textdecoration"><button class="new-appointment">Close</button></router-link>
      </main>
    </div>`,
};