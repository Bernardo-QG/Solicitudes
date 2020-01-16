<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-66 md-xsmall-size-80 mx-auto">
      <simple-wizard>
        <template slot="header">
         <router-link to="/operaciones/soporte/solicitud">   
            <md-button class="md-icon-button md-raised md-accent pull-right ">
                <md-icon class="material-icons">keyboard_backspace</md-icon>
            </md-button>
          </router-link>
          <h3 class="title">Agrega una nueva solicitud de soporte</h3>
          <h5 class="category">
             Ingresa la información que describa la petición de soporte.
          </h5>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label">
             Origen
          </template>
          <first-step ref="step1" v-model="sieditar" @on-validated="onStepValidated"></first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label">
            Descripción
          </template>
          <second-step ref="step2" v-model="sieditar" @on-validated="onStepValidated"
          ></second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step3')">
          <template slot="label">
            Prioridad
          </template>
          <third-step ref="step3" v-model="sieditar" @on-validated="wizardComplete"></third-step>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import FirstStep from "./soporte-solicitud-nueva/FirstStep.vue";
import SecondStep from "./soporte-solicitud-nueva/SecondStep.vue";
import ThirdStep from "./soporte-solicitud-nueva/ThirdStep.vue";
import Swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";

export default {
  data() {
    return {
      sieditar: false,
      model: {
          reporto: '',
          enviado: 'No',
          estatus: 'Solicitud',
          fecha:''         
      },
      wizardModel: {}
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    SimpleWizard,
    WizardTab
  },
  methods: {
    validateStep(ref) {
     
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    wizardComplete(validated, model) {
      var fecha = new Date();
      var options = { year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric'};
      this.model.fecha = fecha.toLocaleDateString("es-ES", options);
      // aqui se deve poner al usuario logeado, pero como no se como agarrarlo (Aun) se pone fijo XD
      this.model.reporto = this.$usuariologueado.Nombre;

      this.wizardModel = {...this.model, ...this.wizardModel, ...model };
      //console.log(this.wizardModel);
      //console.log(JSON.stringify(this.wizardModel));
      var params = JSON.stringify(this.wizardModel);
      
      this.$http.post(this.$serverBackEnd+'/solicitud', params, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.tableData = response.data;
          this.$router.push('/operaciones/soporte/solicitud');
          
          Swal.fire({
            icon: 'success',
            title: 'Solicitud de soporte guardada como borrador.',
            showConfirmButton: false,
            timer: 2500
          });
        })
        .catch(error => {
          console.log(error); 
          Swal.fire({
            icon: 'error',
            title: 'No se pudo agregar nueva solicitud.',
            showConfirmButton: false,
            timer: 2500
          });
      });
      


     
    }
  }
};
</script>
