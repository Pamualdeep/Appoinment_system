export const ClientDate1= {
    template: `
        <div>
            <h2>Book an Appointment</h2>
            <v-calendar v-model="selectedDate"></v-calendar>
            <p>Selected Date: {{ selectedDate }}</p>
        </div>
    `,
    data() {
        return { selectedDate: new Date() };
    }
};
