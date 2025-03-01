export const StaffTiming = {
  template: `
      <div class="timing-container">
        <h1>Office Timings</h1>
        <p class="subheading">Set Timing To Staff</p>
        <div class="form-container">
          <div class="form-group flex">
            <label for="days">Days :</label>
            <select id="start-day" v-model="startDay">
              <option v-for="day in days" :value="day">{{ day }}</option>
            </select>
            <span>to</span>
            <select id="end-day" v-model="endDay">
              <option v-for="day in days" :value="day">{{ day }}</option>
            </select>
          </div>
{{ selectedDays }}
          <div class="form-group flex">
            <label for="timing">Timing :</label>
            <div class="time-input flex">
              <input type="number" min="1" max="12" placeholder="10" v-model="startHour" />
              <input type="number" min="0" max="59" placeholder="00" v-model="startMinute" />
              <select v-model="startPeriod">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <span>to</span>
              <input type="number" min="1" max="12" placeholder="10" v-model="endHour" />
              <input type="number" min="0" max="59" placeholder="00" v-model="endMinute" />
              <select v-model="endPeriod">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              </div>
          </div>
          <button v-if="timings.length==0" class="save-button" @click="saveTiming">Save</button>
          <br>
          <h3 v-else> Office Timings </h3>
        </div>

        <table class="timing-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Timing</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(timing, index) in timings" :key="index">
              <td>{{ timing.working_days }}</td>
              <td>{{ convertTo12HrFormat(timing.start_time) }}</td>
              <td>{{ convertTo12HrFormat(timing.end_time) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  data() {
    return {
      days: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      startDay: "Mon",
      endDay: "Mon",
      startHour: "",
      startMinute: "",
      startPeriod: "AM",
      endHour: "",
      endMinute: "",
      endPeriod: "PM",
      timings: [],
    };
  },
  computed: {
    selectedDays() {
      let fromIndex = this.days.indexOf(this.startDay);
      let toIndex = this.days.indexOf(this.endDay);

      if (fromIndex === -1 || toIndex === -1 || fromIndex > toIndex) {
        return "";
      }

      return this.days.slice(fromIndex, toIndex + 1).join(", ");
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      let tokenVal = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const url = "http://localhost:8000/api/getTimings";
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
          this.timings = response.data;
        })
        .catch((error) => {
          console.error("Error fetching list:", error);
        });

    },
    convertTo12HrFormat(time24hr) {
      const [hour, minute] = time24hr.split(":");
      let time12hr = hour % 12 || 12;
      time12hr = time12hr + ":" + minute + (hour >= 12 ? " PM" : " AM");
      return time12hr;
    },
    saveTiming() {

      let min_start = this.startPeriod == "AM" ? this.startMinute : this.startMinute + 12;
      let min_end = this.startPeriod == "AM" ? this.startMinute : this.startMinute + 12;
      let startTime = this.startHour + ":" + min_start;
      let endTime = this.endHour + ":" + min_end;

      const url = "http://localhost:8000/api/saveTimings";
      let userID = localStorage.getItem("user_id");
      // user_id,working_days, start_time,end_time

      const data = {
        user_id: userID,
        working_days: this.selectedDays,
        start_time: startTime,
        end_time: endTime,
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
          this.loadData();
        })
        .catch((error) => {
          console.error("Error:", error); // Log the error
          alert("details saved are failed. Please try again."); // Optional alert for user feedback
        });


      // Clear input fields
      this.startHour = "";
      this.startMinute = "";
      this.endHour = "";
      this.endMinute = "";
      this.startPeriod = "AM";
      this.endPeriod = "AM";
    },
    parseTime(timeString) {
      const [time, period] = timeString.split(" ");
      const [hour, minute] = time.split(":");
      return [hour, minute, period];
    },
  },
};
