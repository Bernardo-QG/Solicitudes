<template>
    <div class="md-layout-item">
      <sucursal-card>
        <h2 class="title text-center" slot="title">{{ title }}</h2>
       
        <div class="md-layout" slot="content-right"> 
          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Nombre</label>
            <md-input v-model="sucursal.nombre" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Tipo</label>
            <md-select v-model="sucursal.nombre" type="text">
            <md-option value="Sucursal">Sucursal</md-option>
            <md-option value="Oficina">Oficina</md-option>
            <md-option value="Coorporativo">Coorporativo</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Encargado</label>
            <md-input v-model="sucursal.encargado" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Domicilio</label>
            <md-input v-model="sucursal.domicilio" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Numero Exterior</label>
            <md-input v-model="sucursal.noExterior" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Numero Interior</label>
            <md-input v-model="sucursal.noInterior" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Barrio</label>
            <md-input v-model="sucursal.barrio" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Ciudad</label>
            <md-input v-model="sucursal.ciudad" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Estado</label>
            <md-input v-model="sucursal.estado" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Codigo Postal</label>
            <md-input v-model="sucursal.codigoPostal" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Id Ciudad</label>
            <md-select v-model="sucursal.idCiudad" type="text">
            <md-option value="Ciudad">Selecciona una ciudad</md-option>
           <!-- <md-option v-for="ciudad in ciudades" [value]="ciudad._id">{{ciudad.nombre}}</md-option>-->
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Clave de Localidad</label>
            <md-input v-model="sucursal.claveLocalidad" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Telefono</label>
            <md-input v-model="sucursal.telefono" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Telefono 2</label>
            <md-input v-model="sucursal.telefono2" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Extension</label>
            <md-input v-model="sucursal.extension" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Tasa IVA</label>
            <md-input v-model="sucursal.tasaIva" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Autoriza</label>
            <md-input v-model="sucursal.autoriza" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px" >
            <label>Estatus</label>
            <md-select v-model="sucursal.estatus" type="text">
            <md-option value="Abierta">Abierta</md-option>
            <md-option value="Cerrada">Cerrada</md-option>
            <md-option value="Suspendida">Suspendida</md-option>
            <md-option value="Coorporativo">Coorporativo</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Fecha</label>
            <md-input v-model="sucursal.fecha" type="date"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Latitud</label>
            <md-input v-model="sucursal.latitud" type="text"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Longitud</label>
            <md-input v-model="sucursal.longitud" type="text"></md-input>
          </md-field>

          
          <div class="button-container">
            <md-button type="submit" @click="realizarOperacion()" class="md-success md-round mt-4">{{ operacion }}</md-button>
            <md-button router-link to="/administracion/sucursales" class="md-danger md-round mt-4">Cancelar</md-button>
          </div>
          
        </div>
      </sucursal-card>
    
    </div>
</template>
<script>
import { SucursalCard } from "@/components";
export default {
  components: {
    SucursalCard
  },
  data() {
    return {
      title: 'Registrar Sucursal',
      mode: 'Crear',
      operacion: 'Crear',
      sucursales:[],
      sucursal:{},
    };
  },
  created: function() {
    if (this.$route.params.id) {
      this.title = 'Editar Sucursal';
      this.mode = 'Editar';
      this.operacion = 'Guardar';
      this.getSucursal();
    }
  },
  methods: {
    getSucursal() {
      const baseURI = "http://localhost:3300/api/sucursales";
      this.$http.get(baseURI+'/'+this.$route.params.id, {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then((response) => {
        this.sucursal = response.data;
      }).catch( err => {
        console.log(err);
      });
    },

    realizarOperacion(){
      const baseURI = "http://localhost:3300/api/sucursales";
      if (this.mode == 'Crear') {
          this.$http.post(baseURI,this.sucursal, {
            headers: {
              "X-Access-Token": this.$cookies.get("token")
            }
          }).then( () => {
            this.$swal('Sucursal creada correctamente', this.sucursal.nombre,'success')
            this.$router.push('/administracion/sucursales')
          }).catch((err) => {
            console.log(err);
          })
      } else {
        this.$http.put(baseURI+'/'+this.sucursal._id, this.sucursal, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        }).then(() => {
          this.$swal('Sucursal modificada correctamente', this.sucursal.nombre, 'success');
          this.$router.push('/administracion/sucursales');
        }).catch(err => {
          console.log(err);
        })
      }
    }
},
};
</script>
<style></style>
