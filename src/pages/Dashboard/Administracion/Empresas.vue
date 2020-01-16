<template>


    <div>
      <div class="text-right">
                <md-button router-link to="/empresa" class="btn waves-effect waves-light btn-rounded btn-primary">Crear Empresa</md-button>
              </div>
    <md-card>
            <div class="md-card-header-warning">
                <h3 class="box-title m-b-0">Empresas</h3>
            </div> 
            <md-card-header>
              <md-table>
                <md-table-row>
                  <md-table-cell>Imagen</md-table-cell>
                  <md-table-cell>Nombre</md-table-cell>
                  <md-table-cell>Domicilio</md-table-cell>
                  <md-table-cell>Telefono</md-table-cell>
                  <md-table-cell>Correo</md-table-cell>
                  <md-table-head>Acciones</md-table-head>
                </md-table-row>
              </md-table>
              
            </md-card-header>
            <md-card-content>
              <md-table v-for="empresa in empresas" :key="empresa._id">
                <md-table-row>
                  <md-table-cell md-label="">Imagen de la empresa</md-table-cell>
                  <md-table-cell md-label="">{{empresa.nombre}}</md-table-cell>
                  <md-table-cell md-label="">{{empresa.domicilio}}</md-table-cell>
                  <md-table-cell md-label="">{{empresa.telefono}}</md-table-cell>
                  <md-table-cell md-label="">{{empresa.email}}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                  <md-button router-link :to="{ name: 'Empresa', params: {id: empresa._id}}" class="md-just-icon md-simple md-primary">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="top">Editar</md-tooltip>
                  </md-button>
                  <md-button @click="deleteEmpresa(empresa)" class="md-just-icon md-simple md-danger">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Eliminar</md-tooltip>
                  </md-button>
                  </md-table-cell>  
                </md-table-row>
              </md-table>
            </md-card-content>
          </md-card>
    </div>
    
    
    </template>
    
    <script>
  export default {
  data() {
    return {
      empresas: []
    };
  },
  created: function() {
    this.getEmpresas();
  },
  

  methods: {
    //Metodo que obtiene todas las empresas de la base de datos
    getEmpresas() {
      const baseURI = "http://localhost:3300/api/empresas";
      this.$http
        .get(baseURI, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.empresas = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //para borrar una empresa
    deleteEmpresa(empresa) {
      this.$swal({
          title: '¿Estas seguro?',
          text: 'De realizar esta operacion',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, Eliminalo',
          cancelButtonText: 'No, Guardalo',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
          const baseURI = "http://localhost:3300/api/empresas";
          this.$http.delete(baseURI+ '/'+empresa._id, {
              headers: {
                "X-Access-Token": this.$cookies.get("token")
              }
         })
          .then(() => {
            this.$swal('Eliminado', 'El archivo a sido eliminado correctamente', 'success')
            this.getEmpresas();
            
          })
          .catch(err => {
            console.log(err)

          }) 
          } else {
            this.$swal('Cancelar', 'Su archivo aún está intacto', 'info')
          }
        })
    },
    updateUsuario() {
      //ruta para actualizar un perfil de usuario
      //por parte del administrador
    }
  }
};
    </script>