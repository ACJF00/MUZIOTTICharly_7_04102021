import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(fas);

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  //.use(BootstrapVue)
  //.use(IconsPlugin)
  .mount("#app");
