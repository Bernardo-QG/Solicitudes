<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <div class="text-right">
        <md-button class="btn waves-effect waves-light btn-rounded btn-primary"
          >Crear Usuario</md-button
        >
      </div>
      <md-card>
        <div class="md-card-header-warning">
          <h3 class="box-title m-b-0">Usuarios</h3>
        </div>
        <md-card-content>
          <md-table
            table-header-content="blue"
            v-for="(usuario, index) in usuarios"
            :key="index"
          >
            <md-table-row>
              <md-table-cell md-label="Usuario">{{
                usuario.usuario
              }}</md-table-cell>
              <md-table-cell md-label="Nombre">{{
                usuario.nombre
              }}</md-table-cell>
              <md-table-cell md-label="E-Mail">{{
                usuario.correoElectronico
              }}</md-table-cell>
              <md-table-cell md-label="Celular">{{
                usuario.celular
              }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: []
    };
  },
  created: function() {
    this.getUsuarios();
  },

  methods: {
    //Metodo que obtiene todos los usuarios de la base de datos
    getUsuarios() {
      const baseURI = "http://localhost:3300/api/usuarios";
      this.$http
        .get(baseURI, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.usuarios = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //para borrar un usuario
    deleteUsuario(usuarioID) {
      const baseURI = "http://localhost:3300/api/usuarios";
      this.$http.delete(baseURI+ '/'+usuarioID)
          .then(() => {
            this.getUsuarios();
          })
          .catch(err => {
            console.log(err)
          })
    },
    updateUsuario() {
      //ruta para actualizar un perfil de usuario
      //por parte del administrador
    }
  }
};
</script>
