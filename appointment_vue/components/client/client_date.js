export const ClientDate = {
  template: `
  <div class="client_container">

        <div class="left-panel">
          <div class="message-success">{{ msg }}</div>
        <div class="calendar-container w100">
              
                <div class="calendar-header">
                  <button @click="prevMonth">←</button>
                  <span>{{ monthYear }}</span>
                  <button @click="nextMonth">→</button>
                </div>
                <div class="calendar">
               
                
                  <div class="day-name" v-for="(day, index) in days" :key="index">
                    {{ day }}
                  </div>
               
                  <div
                    v-for="(day, index) in daysInMonth"
                    :key="index"
                    class="calendar-day"
                    @click="selectDate(day)"
                  >
                    {{ day }}
                  </div>
               
              </div>
            </div>
            {{ isHoliday }}
          <div class="row justify_between">
            <h4> {{ selectedDateText }}</h4>
            <h4 v-if="isHoliday ==true" class="holiday-msg">🚫 Holiday! No appointments available.</h4>
            <h4>{{ selectedTimeText }}</h4>

          </div>

            <div v-if="selectedDate && isHoliday == false" id="time-slot-section">
    
          <h3>Select Time Slot:</h3>
            <div class="time-slots">

              <button
              class="slot-btn"
                v-for="(slot, index) in timeSlots"
                :key="index"
                @click="selectTime(slot.time)"
                :disabled="slot.disabled"
              >
                {{ slot.time }}
              </button>
            </div>
          </div>
     
          </div>

        <div class="right-panel">
          <h2>Appointment Details</h2>
          <div class="border">

                Select Staff:<select v-model="selectedStaff" @change="loadData">
                            <option v-for="staff in staffList" :value="staff.staff_id" :key="staff.staff_id">{{ staff.name }}</option>
                          </select>
              </div>
          <div class="date-appointment-card">
            <h3>{{ details.serviceName }}</h3>
            <p>{{ details.servicePrice }}</p>
            
            <p>Available Days: <span>{{ workingDays }}</span></p>
            <p>Not Available Days: <span>{{ holidays }}</span></p>
           
            <h4>Appointment Time</h4>
            <p>{{ appointmentTime }}</p>
          </div>
          <button :disabled="!selectedTime || isHoliday" class="next-btn">
            <router-link to="/client/clientcheckout" class="textdecoration">Next</router-link>
          </button>
        </div>
      </div> 
    `,
  data() {
    return {
      msg: "Please Select Staff",
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDate: null,
      selectedTime: null,
      daysInMonth: [],
      selectedDateText: "No Date Selected",
      selectedTimeText: "No Time Selected",
      appointmentTime: "",
      timeSlots: [],
      office_timings: {},
      workingDays: [],
      isHoliday: false,
      subServices: [],
      staffList: [],
      selectedStaff: null,
      details: {},
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  computed: {
    monthYear() {
      return `${this.getMonthName(this.currentMonth)} ${this.currentYear}`;
    },
    holidays() {
      const workingDaysLower = this.workingDays.map(day => day.trim().toLowerCase());
      // Filter days that are NOT in workingDaysLower
      return this.days.filter(day => !workingDaysLower.includes(day.trim().toLowerCase()));
    },
  },


  methods: {
    // changeStaff(staffId) {
    //   this.selectedStaff = staffId; // Change selected staff programmatically
    // },
    loadStaff() {
      let user_id = localStorage.getItem("user_id");

      const url = "http://localhost:8000/api/guestStaffList";
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer testing_fix_code",
          },
          params: {
            user_id: user_id,
          },
        })
        .then(async (response) => {
          this.staffList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching list:", error);
        });

    },
    getStaffName(staffId) {
      const staff = this.staffList.find(staff => staff.staff_id === staffId);
      return staff ? staff.name : "Staff not found";
    },
    getMonthName(month) {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return months[month];
    },
    renderCalendar() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

      this.daysInMonth = Array(firstDay).fill(""); // Empty cells for alignment
      for (let day = 1; day <= lastDate; day++) {
        this.daysInMonth.push(day);
      }
    },
    selectDate(day) {
      if (!day) return;

      const selectedDate = new Date(this.currentYear, this.currentMonth, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time for comparison

      // Prevent selecting past dates
      if (selectedDate < today) {
        alert("You cannot select a past date. Please choose a future date.");
        return;
      }

      this.selectedDate = selectedDate;
      this.selectedDateText = `Selected Date: ${this.monthYear} ${day}`;
      const formattedDate = this.selectedDate.toLocaleDateString('en-CA');//this.selectedDate.toISOString().split("T")[0];
      // alert(formattedDate)

      localStorage.setItem("appointment_date", formattedDate);
      // localStorage.setItem("staff_id", this.selectedStaff);

      this.selectedTimeText = "No Time Selected";
      this.appointmentTime = "";

      const workingDaysLower = this.workingDays.map(day => day.trim().toLowerCase());
      // Get the day name (e.g., "mon", "tue", etc.)
      const dayName = this.selectedDate.toLocaleString("en-US", { weekday: "short" }).toLowerCase().trim();
      // alert(dayName + "-" + workingDaysLower)
      // Check if the selected day is a non-working day (holiday)
      if (!workingDaysLower.includes(dayName)) {
        this.isHoliday = true;
        this.timeSlots = [];
        alert("This is a non-working day. Please select another day.");
        this.selectedDate = null; // Reset selection
        this.selectedDateText = "No Date Selected";
        return;
      } else {
        alert("working day")
        this.isHoliday = false;
        this.generateTimeSlots();
      }
    },

    getBookedSlot(date, time) {
      if (!this.events || this.events.length === 0) return null;

      let formattedTime = this.convertTo24Hour(time);

      let bookedEvent = this.events.find(event =>
        event.appointment_date === date && event.appointment_time === formattedTime
      );
      // alert(JSON.stringify(bookedEvent))
      if (bookedEvent != undefined) {
        // alert(bookedEvent)
        let text = bookedEvent.duration;
        let ar = text.split(" ");
        let durationText = ar[0];
        // alert(durationText)

        console.log("log", { time: formattedTime, duration: durationText });
        return { time: formattedTime, duration: durationText };
      } else {

        console.log("No booked event found for:", date, formattedTime);
        return null;
      }
    },

    convertTo24Hour(time) {
      let [hour, minute, period] = time.match(/(\d+):(\d+) (\w+)/).slice(1);
      hour = period === "PM" && hour !== "12" ? parseInt(hour) + 12 : hour;
      hour = period === "AM" && hour === "12" ? "00" : hour;
      return `${hour}:${minute}:00`;
    },


    selectTime(time) {
      this.selectedTime = time;
      this.selectedTimeText = `Selected Time: ${this.selectedTime}`;

      // Convert to 24-hour format
      let [hour, minute, period] = this.selectedTime.match(/(\d+):(\d+) (\w+)/).slice(1);
      hour = period === "PM" && hour !== "12" ? parseInt(hour) + 12 : hour;
      hour = period === "AM" && hour === "12" ? "00" : hour; // Handle midnight
      let formattedTime = `${hour}:${minute}`;


      localStorage.setItem("appointment_time", formattedTime);

      this.appointmentTime = `${this.selectedDate.toDateString()} ${this.selectedTime}`;
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.renderCalendar();
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.renderCalendar();
    },
    async loadTimings() {
      let user_id = localStorage.getItem("user_id");

      try {
        const url = "http://localhost:8000/api/guestTimings";
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer testing_fix_code",
          },
          params: {
            user_id: user_id,
          },
        });

        this.office_timings = response.data[0]; // Store fetched details

        // Convert working days string (e.g., "mon,tue,wed") to an array
        this.workingDays = this.office_timings.working_days.split(",");

      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },

    generateTimeSlots() {
      this.timeSlots = []; // Reset time slots

      if (!this.selectedDate) {
        console.log("No date selected.");
        return;
      }

      const selectedDay = this.selectedDate.toLocaleString("en-US", { weekday: "short" }).toLowerCase();
      const workingDays = this.office_timings.working_days.split(",").map(day => day.trim().toLowerCase());

      // Check if selected day is a working day
      if (!workingDays.includes(selectedDay)) {
        this.timeSlots = [];
        this.selectedTimeText = "Holiday - No slots available!";
        return;
      }


      // const selectedDateStr = this.selectedDate.toISOString().split("T")[0];
      const selectedDateStr = this.selectedDate.toLocaleDateString('en-CA');

      // alert(selectedDateStr)
      let startTime = this.office_timings.start_time; // "09:00:00"
      let endTime = this.office_timings.end_time; // "17:00:00"

      let startDate = new Date(this.selectedDate);
      let endDate = new Date(this.selectedDate);
      startDate.setHours(...startTime.split(":").map(Number));
      endDate.setHours(...endTime.split(":").map(Number));

      let bookedSlots = {}; // Store booked slots with duration

      // Loop through each time slot
      while (startDate < endDate) {
        const timeSlot = startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        let bookedEvent = this.getBookedSlot(selectedDateStr, timeSlot);
        let isDisabled = false;

        if (bookedEvent) {
          let duration = bookedEvent.duration; // Get the duration in minutes
          isDisabled = true; // Disable the slot if it's booked

          // Mark additional slots as disabled based on duration
          let nextDisabledTime = new Date(startDate);
          let slotsToDisable = (duration / 30); // 30 min per slot
          // alert(slotsToDisable)
          for (let i = 0; i < slotsToDisable; i++) {
            let nextTimeSlot = nextDisabledTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            bookedSlots[nextTimeSlot] = true; // Disable current slot first
            nextDisabledTime.setMinutes(nextDisabledTime.getMinutes() + 30); // Move time AFTER disabling
          }

        }

        this.timeSlots.push({
          time: timeSlot,
          disabled: isDisabled || bookedSlots[timeSlot], // Disable if previously marked
        });

        startDate.setMinutes(startDate.getMinutes() + 30);
      }
    },

    async loadData() {
      let name = this.getStaffName(this.selectedStaff);
      this.msg = `Get Appointment with ${name}. Please select a date.`;
      this.timeSlots = [];
      let user_id = localStorage.getItem("user_id");
      localStorage.setItem("staff_id", this.selectedStaff);
      try {
        const url = "http://localhost:8000/api/guestAppointmentList";
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer testing_fix_code",
          },
          params: {
            user_id: user_id,
            staff_id: this.selectedStaff,
          },
        });

        this.events = response.data; // Store the fetched business details
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    },
    getLocalData() {
      const storedData = localStorage.getItem("sub_services");
      if (storedData) {
        this.subServices = JSON.parse(storedData);
      }

      this.details.user_id = localStorage.getItem("user_id");
      this.details.service_id = localStorage.getItem("sub_service_id");


    },


  },
  mounted() {
    this.renderCalendar();
    this.loadTimings();
    // this.loadData();
    this.loadStaff();
  },
};
