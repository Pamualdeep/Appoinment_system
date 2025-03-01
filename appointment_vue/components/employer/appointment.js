export const AdminAppointment = {
    data() {
        return {
            staffList: [],
            selectedStaff: null,

            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDate: null,
            appointments: [],
            monthNames: [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ],
            days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        };
    },
    computed: {
        calendarDays() {
            let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
            let totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            let daysArray = new Array(firstDay).fill(0); // Empty slots before the first day
            for (let i = 1; i <= totalDays; i++) {
                daysArray.push(i);
            }
            return daysArray;
        },
        selectedAppointments() {
            return this.appointments.filter(appt => appt.date === this.selectedDate);
        }
    },
    mounted() {
        this.loadStaff();
        this.loadData();
    },
    methods: {
        loadStaff() {
            let user_id = localStorage.getItem("user_id");
            let tokenVal = localStorage.getItem("token");
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
                    this.staffList = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching list:", error);
                });

        },
        async loadData() {
            // alert("load ")
            let user_id = localStorage.getItem("user_id");
            let params = { user_id: user_id };
            if (this.selectedStaff) {
                params.staff_id = this.selectedStaff;
            }
            // alert(params)
            try {
                const url = "http://localhost:8000/api/appointmentList";
                let tokenVal = localStorage.getItem("token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: tokenVal,
                    },
                    params: params,
                });

                this.appointments = response.data; // Store the fetched business details
            } catch (error) {
                console.error("Error fetching business details:", error);
            }
        },

        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
            this.loadData();
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
            this.loadData();
        },
        hasAppointment(day) {
            let formattedDate = this.formatDate(day);
            return this.appointments.some(appt => appt.appointment_date === formattedDate);
        },
        getAppointments(day) {
            let formattedDate = this.formatDate(day);
            return this.appointments.filter(appt => appt.appointment_date === formattedDate);
        },
        formatDate(day) {
            let month = String(this.currentMonth + 1).padStart(2, "0");
            let date = String(day).padStart(2, "0");
            return `${this.currentYear}-${month}-${date}`;
        },
        showAppointments(day) {
            if (day > 0) {
                this.selectedDate = this.formatDate(day);
            }
        },
        formatDate(day) {
            let month = String(this.currentMonth + 1).padStart(2, "0");
            let date = String(day).padStart(2, "0");
            return `${this.currentYear}-${month}-${date}`;
        },
    },
    template: `
        
       <div class="calendar-container w70">
       <div class="border">
        Select Staff:
        <select v-model="selectedStaff" @change="loadData">
            <option v-for="staff in staffList" :value="staff.staff_id" :key="staff.staff_id">{{ staff.name }}</option>
        </select>
        </div>
        <div class="calendar-header ">
            <button @click="prevMonth">❮</button>
            <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
            <button @click="nextMonth">❯</button>
        </div>
        
        <div class="calendar ">
            <div class="day-name" v-for="day in days" :key="day">{{ day }}</div>

            <div v-for="(day, index) in calendarDays"
                :key="index"
                class="calendar-day"
                :class="{ 'has-appointment': hasAppointment(day) }"
                @click="showAppointments(day)">
                <span>{{ day > 0 ? day : '' }}</span>

                <!-- Tooltip for appointments -->
                <div v-if="hasAppointment(day)" class="tooltip">
                    <div v-for="appointment in getAppointments(day)" :key="appointment.appointment_time">
                        {{ appointment.appointment_time }} - {{ appointment.name }} - {{ appointment.sub_service_name}} 
                    </div>
                </div>
            </div>
        </div>

        
    </div>
    `,
};