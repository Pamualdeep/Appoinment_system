export const Header = {
  template: `
<header class="header flex w100 justify_between align_center">
  <div class="logo w15">
    <img src="./images/logobg.png" alt="Creative Agency Logo" />
  </div>
  <nav class="nav flex ">
    <router-link to="/">Home</router-link>
    <router-link to="/register_business">Register Business</router-link>
    <router-link to="/login_business">Login Business</router-link>
    <router-link to="/find_business">Find Business</router-link>
  </nav>
</header>`,
};
