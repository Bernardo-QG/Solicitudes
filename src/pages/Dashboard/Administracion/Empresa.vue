<template>
    <div class="md-layout-item">
      <signup-card>
        <h2 class="title text-center" slot="title">{{ title }}</h2>
       
        <div class="md-layout" slot="content-right"> 
          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Nombre</label>
            <md-input v-model="empresa.nombre" type="text"></md-input>
          </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Nombre Corto</label>
              <md-input v-model="empresa.nombreCorto" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Domicilio</label>
              <md-input v-model="empresa.domicilio" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Telefono</label>
              <md-input v-model="empresa.telefono" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Telefono2</label>
              <md-input v-model="empresa.telefono2" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>RFC</label>
              <md-input v-model="empresa.rfc" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Gerente</label>
              <md-input v-model="empresa.gerente" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Email</label>
              <md-input v-model="empresa.email" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Email de facturacion</label>
              <md-input v-model="empresa.emailFacturacion" type="text"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Fecha de registro</label>
              <md-input v-model="empresa.fechaRegistro" type="date"></md-input>
            </md-field>

            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
              <label>Encargado</label>
              <md-input v-model="empresa.encargado" type="text"></md-input>
            </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Activo</label>
            <md-select v-model="empresa.activo" type="text">
            <md-option value="Si">Si</md-option>
            <md-option value="No">No</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Prioridad</label>
            <md-select v-model="empresa.prioridad" type="text">
            <md-option value="Baja">Baja</md-option>
            <md-option value="Media">Media</md-option>
            <md-option value="Alta">Alta</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Validar</label>
            <md-select v-model="empresa.validar" type="text">
            <md-option value="Sin validar">Sin validar</md-option>
            <md-option value="En proceso">En proceso</md-option>
            <md-option value="Validado">Validado</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 25px">
            <label>Horario</label>
            <md-input v-model="empresa.horario" type="text"></md-input>
          </md-field>

          
          <div class="button-container">
            <md-button type="submit" @click="realizarOperacion()" class="md-success md-round mt-4">{{ operacion }}</md-button>
            <md-button router-link to="/administracion/empresas" class="md-danger md-round mt-4">Cancelar</md-button>
          </div>
          
        </div>
      </signup-card>
    </div>
</template>
<script>
//import { EmpresaCard } from "@/components";
import { SignupCard } from '@/components'
export default {
  components: {
   // EmpresaCard
   SignupCard
  },
  data() {
    return {
      title: 'Registrar Empresa',
      mode: 'Crear',
      operacion: 'Crear',
      empresas:[],
      empresa:{},
    };
  },
  created: function() {
    if ( this.$route.params.id) {
      this.title = 'Editar Empresa';
      this.mode = 'Editar';
      this.operacion = 'Guardar';
      this.getEmpresa();
    }
  },
  methods: {

    getEmpresa() {
      const baseURI = "http://localhost:3300/api/empresas";
      this.$http.get(baseURI+'/'+this.$route.params.id, {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then((response) => {
        this.empresa = response.data;
      }).catch(err => {
        console.log(err);
      });
    },

    realizarOperacion(){
      const baseURI = "http://localhost:3300/api/empresas";
      
      if (this.mode == 'Crear')  {
        this.$http.post(baseURI,this.empresa, {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
        }).then( () => {
          this.$swal('Empresa creada correctamente', this.empresa.nombre,'success')
          this.$router.push('/administracion/empresas')
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.$http.put(baseURI+ '/' + this.empresa._id, this.empresa, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        }).then(() => {
          this.$swal('Empresa modificada correctamente', this.empresa.nombre, 'success');
          this.$router.push('/administracion/empresas');
        }).catch(err => {
          console.log(err);
        });
      }

    }
  },
};
</script>
<style></style>
