import { welcome } from "../components/welcome.js";

export const Home = {
  template: `
    <div>
    <welcome/>
    <BusinessList/>
    </div>
  `,
  components: {
    welcome,

  },
};
