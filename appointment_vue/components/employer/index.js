import { AdminNav } from "./nav.js";
export const EmployerIndex = {
  template: `
      <div>
      <AdminNav/>
      <router-view/>
      </div>
    `,
  components: {
    AdminNav,
  },
};
