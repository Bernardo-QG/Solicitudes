<template>
    <div class="md-layout-item">
      <signup-card>
        <h2 class="title text-center" slot="title">Editar Usuario</h2>
       
        <div class="md-layout" slot="content-right"> 
          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Nombre</label>
            <md-input v-model="usuario.nombre" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Id Grupo Usuario</label>
            <md-select v-model="usuario.idGrupoUsuarios" type="text">
            <md-option v-for="grupo in grupoUsuarios" :key="grupo._id" :value="grupo._id"> {{ grupo.nombre }} </md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Nivel</label>
            <md-select v-model="usuario.nivel" type="text">
            <md-option value="Lectura">Lectura</md-option>
            <md-option value="Alta">Alta</md-option>
            <md-option value="Modificar">Modificar</md-option>
            <md-option value="Borrar">Borrar</md-option>
            <md-option value="Alta-Modificar">Alta-Modificar</md-option>
            <md-option value="Alta-Borrar">Alta-Borrar</md-option>
            <md-option value="Lectura-Alta">Lectura-Alta</md-option>
            <md-option value="Lectura-Modificar">Lectura-Modificar</md-option>
            <md-option value="Todo">Todo</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>id Persona</label>
            <md-select v-model="usuario.idPersona" type="text">
            <md-option value="Persona">Selecciona una persona</md-option>
           <!-- <md-option v-for="persona in personas" [value]="persona._id">{{persona.nombre}}</md-option>-->
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Usuario</label>
            <md-input v-model="usuario.usuario" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Correo</label>
            <md-input v-model="usuario.correoElectronico" type="email"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Celular</label>
            <md-input v-model="usuario.celular" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Activo</label>
            <md-select v-model="usuario.activo" type="text">
            <md-option value="Si">Si</md-option>
            <md-option value="No">No</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px" >
            <label>Id Empresa</label>
            <md-select v-model="usuario.idEmpresa" type="text">
            <md-option v-for="empresa in empresas" :key="empresa._id"  :value="empresa._id">{{empresa.nombre}}</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>idSucursal</label>
            <md-select v-model="usuario.idSucursal" type="text"> 
            <md-option v-for="sucursal in sucursales" :key="sucursal._id" :value="sucursal._id"> {{ sucursal.nombre }}</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>idPuesto</label>
            <md-select v-model="usuario.idPuesto" type="text">
            <md-option v-for="puesto in puestos" :key="puesto._id"  :value="puesto._id">{{puesto.nombre}}</md-option>
            </md-select>
          </md-field>
          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px">
            <label>Intentos</label>
            <md-input v-model="usuario.intentos" type="number"></md-input>
          </md-field>
          <div class="button-container">
            <md-button type="submit" @click="modificarUsuario(usuario)" class="md-success md-round mt-4">Guardar</md-button>
            <md-button router-link to="/administracion/usuarios" class="md-danger md-round mt-4">Cancelar</md-button>
          </div>
           
        </div>
      </signup-card>
    
    </div>
</template>
<script>
import { SignupCard } from "@/components";
export default {
  components: {
    SignupCard
  },
  data() {
    return {
      baseURI: 'http://localhost:3300/api/',
      usuarios:[],
      usuario:{},
      grupoUsuarios: [],
      empresas: [],
      sucursales: [],
      puestos: [],
    };
    
  },
  created: function() {
    this.cargarUsuario();
    this.getGrupos();
    this.getEmpresas();
    this.getSucursales();
    this.getPuestos();
  },
  methods: {
  //Metodo que obtiene el usuario de la base de datos que se modificara
   cargarUsuario() {
      this.$http
        .get(this.baseURI+'usuarios'+'/'+ this.$route.params.id, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.usuario = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //envia los datos que se modificaran en la base de datos
   modificarUsuario(usuario){
   this.$http.put(this.baseURI+'usuarios'+'/'+usuario._id, this.usuario, {
       headers: {
           "X-Access-Token": this.$cookies.get("token")
       }
   }).then(()=>{
     this.$swal('Usuario modificado correctamente', this.usuario.nombre, 'success')
       this.$router.push({path: '/administracion'});
   })
   .catch(err=>{
       console.log(err)
   })
},


    getGrupos() {
      this.$http.get(this.baseURI+'grupos', {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then(response => {
        this.grupoUsuarios = response.data;
      }).catch( err => {
        console.log(err);
      })
    },

    getEmpresas() {
      this.$http.get(this.baseURI+'empresas', {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then( response => {
        this.empresas = response.data;
      }).catch( err => {
        console.log(err);
      }) 
    },

    getSucursales() {
      this.$http.get(this.baseURI+'sucursales', {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then( response => {
        this.sucursales = response.data;
      }).catch( err => {
        console.log(err);
      })
    },

    getPuestos() {
      this.$http.get(this.baseURI+'puestos', {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then( response => {
        this.puestos = response.data;
      }).catch( err => {
        console.log(err);
      })
    }

},
  
};
</script>
<style></style>