<template>
  <div>
    <h5 class="info-text">Nivel de prioridad del soporte</h5>
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="md-layout">
          <div class="md-layout-item md-size-25 md-small-size-100"  @click="uno('Normal')" >
            <icon-checkbox 
              v-model="normal"
              icon="fas fa-laptop"
              title="Normal">
            </icon-checkbox>
          </div>
          <div class="md-layout-item md-size-25 md-small-size-100"  @click="uno('Media')" >
            <icon-checkbox
              v-model="media"
              icon="fas fa-running"
              title="Media">
            </icon-checkbox>
          </div>
          <div class="md-layout-item md-size-25 md-small-size-100"  @click="uno('Alta')" >
            <icon-checkbox
              v-model="alta"
              icon="fas fa-ambulance"
              title="Alta">
            </icon-checkbox>
          </div>
          <div class="md-layout-item md-size-25 md-small-size-100"  @click="uno('Urgente')">
            <icon-checkbox
              v-model="urgente"
              icon="fas fa-radiation-alt"
              title="Urgente">
            </icon-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { IconCheckbox } from "@/components";
import Swal from "sweetalert2";


export default {
   props: ["value"],
  components: {
    IconCheckbox
  },
  data() {
    return {
      normal: true,
      media: false,
      alta: false,
      urgente:false,
      model: {
        prioridad:"Normal"   
      }
      
    };
  },
  mounted() { 
       if(this.value) this.getSolicitud();
  },
  methods: {
    getSolicitud(){      
        this.$http.get(this.$serverBackEnd+'/solicitud/'+this.$route.params.id, {
          headers: { "X-Access-Token": this.$cookies.get("token") }
        })
        .then((response) => {

          this.cambioCheckbox(response.data.prioridad);

        })
        .catch(error => {
          console.log(error); 
        });       
    },
    
    uno(selected) {
        
       this.cambioCheckbox(selected);
        Swal.fire({
          title: "Información de Prioridad de la Solicitud",
          confirmButtonText: 'Entendido',
          html: `<p style="text-align: left;"><b>Normal:</b> Todo tipo de solicitudes que deben ser analizadas.<br>
                 <b>Media: </b> Solicitudes que requieren atención oportuna.<br>
                 <b>Alta: </b> Situaciones con exigencia de Ley/Entidad Reguladora.<br>
                 <b>Urgente: </b> Exclusivamente situaciones de socio/cliente en espera.<br>
                 <br> 
                 <b>Nota: </b> El no seleccionar la prioridad apropiada, será causa de rechazo de la solicitud.</p>`
        });
        
    },
    cambioCheckbox(selected){
      this.normal=this.media=this.alta=this.urgente=true;
        if(selected!="Normal") this.normal=false;
        if(selected!="Media") this.media=false;
        if(selected!="Alta") this.alta=false;
        if(selected!="Urgente") this.urgente=false;
        this.model.prioridad=selected;
    },
    validate() {
       
       this.$emit("on-validated", true, this.model);   
       return Promise.resolve(true);     
    } 
  }
};
</script> 
<style></style>
