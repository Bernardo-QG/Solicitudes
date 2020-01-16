<template>
    <div class="md-latout-item">
    <puesto-card>
        <h2 class="title text-center" slot="title">{{ title }}</h2>
        <div class="md-layout" slot="content-right"> 
            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 650px">
              <label>Nombre</label>
              <md-input v-model="puesto.nombre" type="text"></md-input>
            </md-field>

            <div class="button-container">
                <md-button type="submit" @click="realizarOperacion()" class="md-success md-round mt-4">{{ mode }}</md-button>
                <md-button router-link to="/administracion/puestos" class="md-danger md-round mt-4">Cancelar</md-button>
              </div>
        </div>
    </puesto-card>
    </div>
</template>
<script>
    import { PuestoCard } from "@/components";
    export default {
      components: {
        PuestoCard
      },
      data() {
        return {
          title: 'Registrar Puesto',
          mode: 'Crear',
          puesto:{},
        };
      },
      created: function() {
        if (this.$route.params.id) {
          this.title = 'Editar Puesto',
          this.mode = 'Guardar',
          this.getPuesto();
        }
      }, 
      methods: {
        getPuesto() {
          const baseURI = "http://localhost:3300/api/puestos";
          this.$http.get(baseURI+'/'+this.$route.params.id, {
            headers: {
              "X-Access-Token": this.$cookies.get("token")
            }
          }).then((response) => {
            this.puesto = response.data;
          }).catch(err => {
            console.log(err);
          })
        },
      realizarOperacion(){
        const baseURI = "http://localhost:3300/api/puestos";
        if(this.mode == 'Crear') {
          this.$http.post(baseURI,this.puesto, {
            headers: {
              "X-Access-Token": this.$cookies.get("token")
            }
          }).then(() => {
            this.$swal('Puesto creado correctamente', this.puesto.nombre,'success')
            this.$router.push('/administracion/puestos')
          }).catch((err) => {
            console.log(err);
          });
        } else {
          this.$http.put(baseURI+'/'+this.puesto._id, this.puesto, {
            headers: {
              "X-Access-Token": this.$cookies.get("token")
            }
          }).then(() => {
            this.$swal('Puesto ha sido modificado correctamente', this.puesto.nombre, 'success');
            this.$router.push('/administracion/puestos');
          })
        }

      }
    }
  }
</script>
    
<style></style>