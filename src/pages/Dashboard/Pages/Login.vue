<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
     
        <h2 slot="title" class="title">Soporte</h2>
        <!-- <img slot="title" class="sicap-logo" src="../../../assets/sicap_logo_foot.png" alt=""> -->

        <span slot="description"><md-icon>supervisor_account</md-icon></span>
        <p slot="description" class="description">Plataforma de atencion al cliente y soporte en linea </p>
        <!-- <md-button
          slot="buttons"
          href="#facebook"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-facebook-square"></i>
        </md-button>
        <md-button
          slot="buttons"
          href="#twitter"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-twitter"></i>
        </md-button>
        <md-button
          slot="buttons"
          href="#google"
          class="md-just-icon md-simple md-white"
        >
          <i class="fab fa-google-plus-g"></i>
        </md-button> -->
        
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Correo Electronico</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Contraseña</label>
          <md-input type="password" v-model="password"></md-input>
        </md-field>
        <md-button slot="footer" class="md-simple md-success md-lg" type="submit" @click="login"> 
          Ingresar
        </md-button>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login: function () {
      /*
      const baseURI = "http://localhost:3300/auth/login";
      const payload = {
        correoElectronico: this.email,
        clave: this.password
      }
      this.$http.post(baseURI, payload).then( (result) => {
        let authToken = result.data.token;
        this.$cookies.set("token", authToken);
        this.$router.push('dashboard');
      }).catch( (err) => {
        console.log(err) 
      })
      */
      
      console.log(this.$usuariologueado);
      let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiQmF0c3kiLCJFbWFpbCI6ImJhdG1hbkBnb3QuY29tIiwiZXhwIjoxNTgzNTAyNjMwfQ.uB9Krsv-wx077EAVFwhvE73j9k6jbx9kchKH45b-Ovk";
      this.$cookies.set("token", authToken);
      this.$router.push('dashboard');

    }
  }
};
</script>

<style scoped>
  .login-card { 
    height: 100px;
  }

  .sicap-logo {
    height: auto;
    width: 100%;
    border-radius: 0;
    float: none;
  }
</style>
