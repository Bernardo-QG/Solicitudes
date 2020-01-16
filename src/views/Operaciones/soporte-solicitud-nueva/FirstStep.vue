<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <h5 class="info-text">
          Introduzca información que describa la solicitud de Soporte.
        </h5>
        <div class="md-layout">
          <div class="md-layout-item md-size-95 ml-auto mt-4 md-small-size-100">
            <ValidationProvider name="Nombre de la solicitud" rules="required|min:10"  v-slot="v" >
                <md-field >
                 <label>Nombre de la solicitud</label>
                <md-input v-model="model.nombreSolicitud" name="nombreSolicitu"></md-input>
                <md-icon>all_inclusive</md-icon>
              </md-field>
              <span class="mivalidate" >{{ v.errors[0] }}</span>
              
            </ValidationProvider>  
          </div>
          
           <div class="md-layout-item md-size-95 ml-auto mt-4 md-small-size-100">
               <ValidationProvider  name="Empresa" rules="required"  v-slot="v" >
                 
                   <md-autocomplete v-model="miempresa"
                                  :md-options="getEmpresaLabels">
                    <label>Empresa</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.Name}}</template>
                    <template slot="md-autocomplete-empty" slot-scope="{ term }">
                        No se encontraron resultados para "{{ term }}".
                      </template>
                  </md-autocomplete>
                                    
                  <span class="mivalidate" >{{ v.errors[0] }}</span>
                </ValidationProvider>      
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>


import { extend } from "vee-validate";


extend('min', {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ['length'],
  message: 'El campo {_field_} debe tener al menos {length} caracteres.'
});

extend('required', {
 validate () {
    return {
      required: true,
    };
  },
  message: 'El campo {_field_} es requerido.'
});

export default {
  props: ["value"],
  data() {
    return {
      model: {
          nombreSolicitud: '',
          empresa: ''         
      },
      empresaOptions: [],
      miempresa:null
    };
  },
  methods: {
    getSolicitud(){      
        this.$http.get(this.$serverBackEnd+'/solicitud/'+this.$route.params.id, {
          headers: { "X-Access-Token": this.$cookies.get("token") }
        })
        .then((response) => {
          this.model.nombreSolicitud=response.data.nombreSolicitud;
          this.model.reporto=response.data.reporto;
          this.model.enviado=response.data.enviado;
          this.model.estatus=response.data.estatus;
          this.model.fecha=response.data.fecha;      

    
        })
        .catch(error => {
          console.log(error); 
        });       
    },
     getEmpresasBackEnd(){
      
        this.$http.get(this.$serverBackEnd+'/empresas', {
          headers: { "X-Access-Token": this.$cookies.get("token") }
        })
        .then(response => {
          this.empresaOptions = response.data;
        })
        .catch(error => {
          console.log(error); 
        });
       
    },
    validate() {
      
      return this.$refs.form.validate().then(res => {
        this.model.empresa=this.miempresa.Name;
        this.$emit("on-validated", res, this.model);
        return res;
      });
    }
  },
  mounted() { 
    this.getEmpresasBackEnd(); 
    if(this.value) this.getSolicitud();
  },
  computed: {
    getEmpresaLabels() {
      return this.empresaOptions.map(label => ({
        'Id': label._id,
        'Name': label.nombre,
        'toLowerCase': () => label.nombre.toLowerCase(),
        'toString': () => label.nombre
      }));
    },
   


  }  
};
</script>
<style>
    .mivalidate{
      color:#EC7063;  
      font-size: 11px;
    }
</style>
