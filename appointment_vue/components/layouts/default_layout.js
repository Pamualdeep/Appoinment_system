import { Header } from "../header_home.js";
import { Footer } from "../home_footer.js";
import { HomeHeader } from "../home_header.js";
export const DefaultLayout = {
  components: {
    Header,
    Footer,
    HomeHeader,
  },
  template: `
  <div>
  <Header />
      <HomeHeader/>
      
      <router-view></router-view>
      <Footer />
  </div>
`,
};
