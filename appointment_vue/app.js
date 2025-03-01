// import { createRouter, createWebHistory } from "vue-router";
// import { EmployerLayout } from "./components/layouts/employer_layout.js";
// import { DefaultLayout } from "./components/layouts/default_layout.js";
// // import { Header } from "../components/header_home.js";
// import { Home } from "./components/home.js";
// // import { ContactUs } from "./components/contactus.js";
// // import { PageNotFound } from "./components/pagenotfound.js";
// // import { Footer } from "./components/home_footer.js";
// // import { SuccessStoriesnav } from "./components/Success_StoriesNav.js";
// // import { EmployerIndex } from "./components/employer/admin_index.js";
// import { AdminServices } from "./components/employer/admin_panelservices.js";
// import { UserDetail } from "./components/employer/admin_user_detail.js";
// import { BusinessDetail } from "./components/employer/admin_business_detail.js";
// import { Staff } from "./components/employer/admin_panelstaff.js";
// import { StaffTiming } from "./components/employer/admin_panelstafftiming.js";
// import { Sidebar } from "./components/employer/admin_panelsidebar.js";
// import { AdminNav } from "./components/employer/admin_panelnav.js";
// import { AdminLeave } from "./components/employer/admin_panelleave.js";
// import { AddStaff } from "./components/employer/admin_paneladdstaff.js";
// import { AdminSubService } from "./components/employer/admin_paneladd_subservice.js";
// import { AdminAppointment } from "./components/employer/admin_appointment.js";
// import { AppointmentHistory } from "./components/employer/admin_appointment_his.js";
// import { ClientServices } from "./components/client/client_services.js";
// import { ClientSubService } from "./components/client/client_sub_service.js";
// import { ClientDate } from "./components/client/client_date.js";
// import { ClientCheckout } from "./components/client/client_checkout.js";
// import { ServiceBooked } from "./components/client/client_booked.js";

// // Define Routes

// // const routes = [
// //   { path: "/", component: Home },
// //   { path: "/employer", component: EmployerIndex },
// // ];
// const routes = [
//   {
//     path: "/",
//     component: DefaultLayout,
//     children: [{ path: "", name: "Home", component: Home }],
//   },
//   {
//     path: "/employer",
//     component: EmployerLayout,
//     children: [
//       { path: "services", name: "Services", component: AdminServices },
//       { path: "userdetail", name: "UserDetail", component: UserDetail },
//       {
//         path: "businessdetail",
//         name: "BusinessDetail",
//         component: BusinessDetail,
//       },
//       { path: "stafftiming", name: "StaffTiming", component: StaffTiming },
//       { path: "sidebar", name: "Sidebar", component: Sidebar },
//       { path: "staff", name: "Staff", component: Staff },
//       { path: "nav", name: "nav", component: AdminNav },
//       { path: "leaves", name: "Leave", component: AdminLeave },
//       { path: "addstaff", name: "AddStaff", component: AddStaff },
//       {
//         path: "addsubservice",
//         name: "AddSubService",
//         component: AdminSubService,
//       },
//       {
//         path: "businessdetail",
//         name: "BusinessDetail",
//         component: BusinessDetail,
//       },
//       {
//         path: "adminappointment",
//         name: "AdminAppointment",
//         component: AdminAppointment,
//       },
//       {
//         path: "AppointmentHistory",
//         name: "AppointmentHistory",
//         component: AppointmentHistory,
//       },
//     ],
//   },
//   {
//     path: "/Client",
//     component: DefaultLayout,
//     children: [
//       {
//         path: "clientservice",
//         name: "ClientService",
//         component: ClientServices,
//       },
//       {
//         path: "clientsubservice",
//         name: "ClientSubService",
//         component: ClientSubService,
//       },
//       { path: "clientdate", name: "ClientDate", component: ClientDate },
//       {
//         path: "clientcheckout",
//         name: "ClientCheckout",
//         component: ClientCheckout,
//       },
//       {
//         path: "clientbooked",
//         name: "ClientBooked",
//         component: ServiceBooked,
//       },
//     ],
//   },
// ];
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });
// // Create Router Instance
// // const router = VueRouter.createRouter({
// //   history: VueRouter.createWebHashHistory(), // Uses hash-based routing
// //   routes,
// // });
// console.log("Router initialized", router);
// console.log("App initialized and mounted");

// // Create Vue Application
// const app = Vue.createApp({});

// // Use the Router in the App
// app.use(router);

// // Mount the App
// app.mount("#app");
