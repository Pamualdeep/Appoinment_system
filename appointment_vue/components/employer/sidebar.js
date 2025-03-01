// import { AdminServices } from "./services.js";

export const Sidebar = {
  // components: {
  //   AdminServices,
  // },
  template: `
    <!-- Sidebar -->
    <div class="sidebar w20">
   
      <ul>
        <li><router-link to="/employer/services">Services</router-link></li>
      
        <li><router-link to="/employer/staff">Staff</router-link></li>
        <li><router-link to="/employer/stafftiming">Timing</router-link></li>
        <li><router-link to="/employer/leaves">Leave</router-link></li>
        <li><router-link to="/employer/adminappointment">Appointments</router-link></li>
        <li><router-link to="/employer/AppointmentHistory">Appointment List History</router-link></li>
      </ul>
    </div>`,
};
