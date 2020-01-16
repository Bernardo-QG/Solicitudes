<template>
    <div class="md-latout-item">
        <grupoUsuario-card>
        <h2 class="title text-center" slot="title">{{ title }}</h2>
        <div class="md-layout" slot="content-right"> 
            <md-field class="md-layout-item md-small-size-100 md-size-30" style="margin-right: 650px">
              <label>Nombre</label>
              <md-input v-model="grupoUsuario.nombre" type="text"></md-input>
            </md-field>
            <div class="button-container">
                <md-button type="submit" @click="realizarOperacion()" class="md-success md-round mt-4">{{ mode }}</md-button>
                <md-button router-link to="/administracion/grupoUsuarios" class="md-danger md-round mt-4">Cancelar</md-button>
              </div>
        </div>
    </grupoUsuario-card>
    </div>
</template>
<script>
    import { GrupoUsuarioCard } from "@/components";
    export default {
      components: {
        GrupoUsuarioCard
      },
      data() {
        return {
          title: 'Registrar Grupo',
          mode: 'Crear',
          grupoUsuario: {}
        };
      },
      created: function() {
        if (this.$route.params.id) {
          this.title = 'Editar Grupo';
          this.mode = 'Guardar';
          this.getGrupo();
        }
      },
      methods: {
      
      getGrupo() {
        const baseURI = "http://localhost:3300/api/grupos";
        this.$http.get(baseURI+'/'+this.$route.params.id, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        }).then( response => {
          this.grupoUsuario = response.data;
        }).catch(err => {
          console.log(err);
        })
      },
      realizarOperacion(){
        const baseURI = "http://localhost:3300/api/grupos";
        if(this.mode == 'Crear') {
          this.$http.post(baseURI,this.grupoUsuario, {
            headers: {
              "X-Access-Token": this.$cookies.get("token")
            }
          }).then(() => {
              this.$swal('Grupo Usuario creado correctamente', this.grupoUsuario.nombre,'success')
              this.$router.push("/administracion/grupoUsuarios");
          }).catch(err => {
            console.log(err)
          });
        } else {
          this.$http.put(baseURI+'/'+this.grupoUsuario._id, this.grupoUsuario, {
            headers: {
              "X-Access-Token": this.$cookies.get("token")
            }
          }).then( () => {
            this.$swal('Grupo Usuario ha sido modificado correctamente', this.grupoUsuario.nombre, 'success');
            this.$router.push('/administracion/grupoUsuarios');
          }).catch(err => {
            console.log(err);
          })
        }
      }
    },
  };
</script>
<style></style>