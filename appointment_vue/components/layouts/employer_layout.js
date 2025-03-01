import { AdminNav } from "../employer/nav.js";
import { Sidebar } from "../employer/sidebar.js";
export const EmployerLayout = {
  components: {
    AdminNav,
    Sidebar,
  },
  template: `
    <div>
    <AdminNav />
    <div class="flex">
    <Sidebar />
    <router-view></router-view>
    </div>
    </div>
 
  `,
};
