import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

// Operaciones

import Soporte_solicitud from '@/views/Operaciones/soporte-solicitud.vue';
import Soporte_solicitud_nueva from '@/views/Operaciones/soporte-solicitud-nueva.vue';
import Soporte_solicitud_desplegar from '@/views/Operaciones/soporte-solicitud-desplegar.vue';
import Soporte_solicitud_editar from '@/views/Operaciones/soporte-solicitud-editar.vue';
import Soporte_bandeja from '@/views/Operaciones/soporte-bandeja.vue';
import Soporte_bandeja_desplegar from '@/views/Operaciones/soporte-bandeja-desplegar.vue';



// Pages
import User from "@/pages/Dashboard/Pages/UserProfile.vue";
import Pricing from "@/pages/Dashboard/Pages/Pricing.vue";
import TimeLine from "@/pages/Dashboard/Pages/TimeLinePage.vue";
import RtlSupport from "@/pages/Dashboard/Pages/RtlSupport.vue";
import Login from "@/pages/Dashboard/Pages/Login.vue";
import Register from "@/pages/Dashboard/Pages/Register.vue";
import Lock from "@/pages/Dashboard/Pages/Lock.vue";

// Components pages
import Buttons from "@/pages/Dashboard/Components/Buttons.vue";
import GridSystem from "@/pages/Dashboard/Components/GridSystem.vue";
import Panels from "@/pages/Dashboard/Components/Panels.vue";
import SweetAlert from "@/pages/Dashboard/Components/SweetAlert.vue";
import Notifications from "@/pages/Dashboard/Components/Notifications.vue";
import Icons from "@/pages/Dashboard/Components/Icons.vue";
import Typography from "@/pages/Dashboard/Components/Typography.vue";

// Forms pages
import RegularForms from "@/pages/Dashboard/Forms/RegularForms.vue";
import ExtendedForms from "@/pages/Dashboard/Forms/ExtendedForms.vue";
import ValidationForms from "@/pages/Dashboard/Forms/ValidationForms.vue";
import Wizard from "@/pages/Dashboard/Forms/Wizard.vue";

// TableList pages
import RegularTables from "@/pages/Dashboard/Tables/RegularTables.vue";
import ExtendedTables from "@/pages/Dashboard/Tables/ExtendedTables.vue";
import PaginatedTables from "@/pages/Dashboard/Tables/PaginatedTables.vue";

// Paginas administracion
import UsuariosAdmin from "@/pages/Dashboard/Administracion/Usuarios.vue";

// Maps pages
import GoogleMaps from "@/pages/Dashboard/Maps/GoogleMaps.vue";
import FullScreenMap from "@/pages/Dashboard/Maps/FullScreenMap.vue";
import VectorMaps from "@/pages/Dashboard/Maps/VectorMaps.vue";

// Calendar
import Calendar from "@/pages/Dashboard/Calendar.vue";
// Charts
import Charts from "@/pages/Dashboard/Charts.vue";
import Widgets from "@/pages/Dashboard/Widgets.vue";



let operacionesMenu = {
  path: "/operaciones",
  component: DashboardLayout,
  redirect: "/operaciones/soporte/solicitud",
  name: "Operaciones",
  children: [
    {
      path: "soporte/solicitud",
      name: "SOLICITUDES DE SOPORTE",
      components: { default: Soporte_solicitud }
    },{
      path: "soporte/solicitud/nueva",
      name: "SOLICITUD NUEVA",
      components: { default:  Soporte_solicitud_nueva }
    },{
      path: "soporte/solicitud/editar/:id",
      name: "EDITAR SOLICITUD",
      components: { default:  Soporte_solicitud_editar }
    },{
      path: "soporte/solicitud/desplegar/:id",
      name: "MI SOLICITUD DE SOPORTE",
      components: { default: Soporte_solicitud_desplegar }
    },{
      path: "soporte/bandeja",
      name: "BANDEJA DE SOLICITUDES",
      components: { default: Soporte_bandeja }
    },{
      path: "soporte/bandeja/desplegar/:id",
      name: "SOLICITUD DE SOPORTE",
      components: { default: Soporte_bandeja_desplegar }
    }
  ]
};

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons }
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem }
    },
    {
      path: "panels",
      name: "Panels",
      components: { default: Panels }
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications }
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons }
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography }
    }
  ]
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms }
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms }
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms }
    },
    {
      path: "wizard",
      name: "Wizard",
      components: { default: Wizard }
    }
  ]
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables }
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables }
    },
    {
      path: "paginated",
      name: "Pagianted Tables",
      components: { default: PaginatedTables }
    }
  ]
};

let adminMenu = {
  path: "/administracion",
  component: DashboardLayout,
  name: "Administracion",
  redirect: "/administracion/usuarios",
  children: [
    {
      path: 'usuarios',
      name: 'Usuarios',
      components: { default: UsuariosAdmin }
    }
  ]
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps }
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: { default: VectorMaps }
    }
  ]
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      components: { default: User }
    },
    {
      path: "timeline",
      name: "Timeline Page",
      components: { default: TimeLine }
    },
    {
      path: "rtl",
      name: "وحة القيادة",
      meta: {
        rtlActive: true
      },
      components: { default: RtlSupport }
    }
  ]
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Ingresar",
      component: Login
    },
    {
      path: "/registrar",
      name: "Registrar",
      component: Register
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/lock",
      name: "Bloquear",
      component: Lock
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  operacionesMenu,
  componentsMenu,
  formsMenu,
  tablesMenu,
  adminMenu,
  mapsMenu,
  pagesMenu,
  authPages,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard }
      },
      {
        path: "calendar",
        name: "Calendar",
        components: { default: Calendar }
      },
      {
        path: "charts",
        name: "Charts",
        components: { default: Charts }
      },
      {
        path: "widgets",
        name: "Widgets",
        components: { default: Widgets }
      }
    ]
  }
];



export default routes;
