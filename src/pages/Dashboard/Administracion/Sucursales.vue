<template>


    <div>
      <div class="text-right">
                <md-button router-link to="/sucursal" class="btn waves-effect waves-light btn-rounded btn-primary">Crear Sucursal</md-button>
              </div>
    <md-card>
            <div class="md-card-header-warning">
                <h3 class="box-title m-b-0">Sucursales</h3>
            </div> 
            <md-card-header>
              <md-table>
                <md-table-row>
                  <md-table-cell>Imagen</md-table-cell>
                  <md-table-cell>Nombre</md-table-cell>
                  <md-table-cell>Domicilio</md-table-cell>
                  <md-table-cell>Telefono</md-table-cell>
                  <md-table-cell>Estado</md-table-cell>
                  <md-table-head>Acciones</md-table-head>
                </md-table-row>
              </md-table>
              
            </md-card-header>
            <md-card-content>
              <md-table v-for="sucursal in sucursales" :key="sucursal._id">
                <md-table-row>
                  <md-table-cell md-label="">Imagen de la sucursal</md-table-cell>
                  <md-table-cell md-label="">{{sucursal.nombre}}</md-table-cell>
                  <md-table-cell md-label="">{{sucursal.domicilio}}</md-table-cell>
                  <md-table-cell md-label="">{{sucursal.telefono}}</md-table-cell>
                  <md-table-cell md-label="">{{sucursal.estado}}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                    <md-button router-link :to="{name: 'Sucursal', params: {id: sucursal._id}}" class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Editar</md-tooltip>
                    </md-button>
                    <md-button @click="deleteSucursal(sucursal)" class="md-just-icon md-simple md-danger">
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
      sucursales: []
    };
  },
  created: function() {
    this.getSucursales();
  },
  

  methods: {
    //Metodo que obtiene todas las sucursales de la base de datos
    getSucursales() {
      const baseURI = "http://localhost:3300/api/sucursales";
      this.$http
        .get(baseURI, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.sucursales = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //para borrar una sucursal
    deleteSucursal(sucursal) {
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
      const baseURI = "http://localhost:3300/api/sucursales";
      this.$http.delete(baseURI+ '/'+sucursal._id, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
          .then(() => {
            this.$swal('Eliminado', 'El documento a sido eliminado correctamente', 'success')
            this.getSucursales();
            
          })
          .catch(err => {
            console.log(err)

          })
            
          } else {
            this.$swal('Cancelar', 'Su archivo aún está intacto', 'info')
          }
        })




          
    },
    
  }
};
    </script>