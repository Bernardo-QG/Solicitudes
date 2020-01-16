<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ usuario.role }}</h6>
      <h4 class="card-title">{{ usuario.nombre }}</h4>
      <p class="card-description">
        Don't be scared of the truth because we need to restart the human
        foundation in truth And I love you like Kanye loves Kanye I love Rick
        Owens’ bed design but the back is...
      </p>
      <md-button class="md-round" :class="getColorButton(buttonColor)"
        >Follow</md-button
      >
    </md-card-content>
  </md-card>
</template>
<script>
import jwtDecode from 'jwt-decode';
export default {
  
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: "./img/faces/marc.jpg"
    },
    buttonColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      usuario: {}
    };
  },
  created: function() {
    this.getUsuario()
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    },
    getUsuario: function() {
      const baseURI = "http://localhost:3300/api/usuarios";
      let payload = ''
  
      if (this.$cookies.isKey('token')) {
        payload = jwtDecode(this.$cookies.get('token'))
      }

      this.$http
        .get(baseURI + '/' + payload.ID, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.usuario = response.data;
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style></style>
