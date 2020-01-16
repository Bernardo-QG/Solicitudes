<template>


<div>
  <div class="text-right">
            <md-button router-link to="/puesto" class="btn waves-effect waves-light btn-rounded btn-primary">Crear Puesto</md-button>
          </div>
<md-card>
        <div class="md-card-header-warning">
            <h3 class="box-title m-b-0">Puestos</h3>
        </div> 
        <md-table>

          <md-table-row>
            <md-table-head>Id</md-table-head>
            <md-table-head>Nombre</md-table-head>
          </md-table-row>

            <md-table-row v-for="puesto in puestos" :key="puesto._id">
              <md-table-cell md-label="Id">{{puesto._id}}</md-table-cell>
              <md-table-cell md-label="Nombre">{{puesto.nombre}}</md-table-cell>
              <md-table-cell md-label="Acciones">
              <md-button router-link :to="{name: 'Puesto', params: {id: puesto._id}}" class="md-just-icon md-simple md-primary">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="top">Editar</md-tooltip>
              </md-button>
              <md-button @click="deletePuesto(puesto)" class="md-just-icon md-simple md-danger">
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="top">Eliminar</md-tooltip>
              </md-button>
              </md-table-cell>
            </md-table-row>
      </md-table>
      </md-card>
</div>


</template>

<script>
export default {
  data() {
    return {
      puestos: []
    };
  },
  created: function() {
    this.getPuestos();
  },
  
  methods: {
    //Metodo que obtiene todos los usuarios de la base de datos
    getPuestos() {
      const baseURI = "http://localhost:3300/api/puestos";
      this.$http
        .get(baseURI, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.puestos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //para borrar un usuario
    deletePuesto(puesto) {
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
            const baseURI = "http://localhost:3300/api/puestos";
          this.$http.delete(baseURI+ '/'+puesto._id, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
          .then(() => {
            this.$swal('Eliminado', 'El archivo a sido eliminado correctamente', 'success')
            this.getPuestos();
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