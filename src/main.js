// =========================================================
// * Vue Material Dashboard PRO - v1.3.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";

// Plugins
import App from "./App.vue";
import Chartist from "chartist";
import axios from 'axios';
import VueCoookies from 'vue-cookies';

// router setup
import routes from "./routes/routes";




// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueCoookies)





Vue.$cookies.config('8h')
Vue.prototype.$http = axios;


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active"
});

// go server

Vue.prototype.$serverBackEnd = 'http://localhost:3300/api';
//Vue.prototype.$serverBackEnd = 'http://apps.sicap.mx:3300/api';
Vue.prototype.$usuariologueado={
  Nombre:"Bernardo Quintino G.",
  Usuario:"BQG",
  CorreoElectronico:"bernardo@sicap.mx"
};

//Bloquear acceso si no tienen credenciales
router.beforeEach((to, from, next) => {  
  if (!Vue.$cookies.isKey("token") && to.path !== '/login') {
    console.log(Vue.$cookies.isKey("token"))
    next('/login')
  }else {
      next()
  }
});



// global library setup
Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
