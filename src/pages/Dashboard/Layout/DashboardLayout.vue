<template>
  <div
    class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
      { rtl: $route.meta.rtlActive }
    ]"
  >
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{
            name: 'لوحة القيادةة',
            icon: 'dashboard',
            path: '/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-else
          :link="{ name: 'Dashboard', icon: 'dashboard', path: '/dashboard' }"
        >
        </sidebar-item>
         <sidebar-item
            v-if="!$route.meta.rtlActive" 
            :link="{ name:'Operaciones', icon: 'headset_mic', path: '/operaciones' }">
            <sidebar-item :link="{name:'Solicitud de Soporte'      ,   path: '/operaciones/soporte/solicitud'}">    </sidebar-item>
            <sidebar-item :link="{name: 'Bandeja de Solicitudes'   ,   path:'/operaciones/soporte/bandeja'}">       </sidebar-item>
        </sidebar-item>

        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{ name: 'صفحات', icon: 'image' }"
        >
          <sidebar-item
            :link="{ name: 'Pricing', path: '/pricing' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'دعم رتل', path: '/pages/rtl' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'الجدول الزمني', path: '/pages/timeline' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'صفحة تسجيل الدخول', path: '/login' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'سجل الصفحة', path: '/registrar' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'login', path: '/lock' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'ملف تعريفي للمستخدم', path: '/pages/user' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item v-else :link="{ name: 'Pages', icon: 'image' }">
          <sidebar-item
            :link="{ name: 'Pricing', path: '/pricing' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'RTL Support', path: '/pages/rtl' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Timeline', path: '/pages/timeline' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Login', path: '/login' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Registrar', path: '/registrar' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Lock Screen', path: '/lock' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'User Profile', path: '/pages/user' }"
          ></sidebar-item>
        </sidebar-item>

        <sidebar-item
          v-if="$route.meta.rtlActive"
          :link="{ name: 'التقويم', icon: 'date_range', path: '/calendar' }"
        ></sidebar-item>
        <sidebar-item
          v-else
          :link="{ name: 'Calendar', icon: 'date_range', path: '/calendar' }"
        ></sidebar-item>

        <sidebar-item
        v-if="!$route.meta.rtlActive" 
        :link="{ name:'Administracion', icon: 'menu_book', path: '/administracion' }">
        <sidebar-item 
        :link="{name:'Usuarios', path: '/administracion/usuarios'}">
        </sidebar-item>
        <sidebar-item 
        :link="{name: 'Envio de Archivos', path:'/administracion/archivo'}">
        </sidebar-item>
        </sidebar-item>


        
        
        
        
        <sidebar-item :link="{name: 'Soporte', icon: 'supervisor_account', path: '#'}">
        

        </sidebar-item>

      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :colorBg.sync="sidebarBackgroundColor"
        :sidebarMini.sync="sidebarMini"
        :sidebarImg.sync="sidebarImg"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
    document.getElementsByClassName(className)[0].scrollTop = 0;
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

function reinitScrollbar() {
  let docClasses = document.body.classList;
  let isWindows = navigator.platform.startsWith("Win");
  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    initScrollbar("sidebar");
    initScrollbar("sidebar-wrapper");
    initScrollbar("main-panel");

    docClasses.add("perfect-scrollbar-on");
  } else {
    docClasses.add("perfect-scrollbar-off");
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import FixedPlugin from "../../FixedPlugin.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    FixedPlugin,
    MobileMenu,
    UserMenu,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "purple",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  updated() {
    reinitScrollbar();
  },
  mounted() {
    reinitScrollbar();
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
