<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        
        <div class="md-layout">
          <div class="md-layout-item md-size-95 ml-auto mt-4 md-small-size-100">
            <ValidationProvider name="Descripción" rules="min:30|required"  v-slot="v" >
                <md-field >
                 <label>Descripción</label>
                 <md-textarea class="textarea"  name="descripcion" v-model="model.descripcion"></md-textarea>
                 <md-icon>description</md-icon>
              </md-field>
              <span class="mivalidate" >{{ v.errors[0] }}</span>
              
            </ValidationProvider>  
          </div>
          
           <div class="md-layout-item md-size-95 ml-auto mt-4 md-small-size-100">
              <md-field >
                 <label for="rutas">Ruta de referencia</label>
                    <md-select v-model="model.rutaReferencia" name="rutaReferencia"  multiple>
                     <md-option v-for="option in rutasOptions"                      
                       :value="option" :key="option">{{option}}</md-option>
                    </md-select>            
              </md-field> 
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>


import { extend } from "vee-validate";
import rutasReferencia from "./rutasReferencia";


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
          descripcion: '',
          rutaReferencia: []        
      },
      rutasOptions: rutasReferencia
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
          this.model.descripcion=response.data.descripcion;
          this.model.rutaReferencia=response.data.rutaReferencia; 
          

        })
        .catch(error => {
          console.log(error); 
        });       
    },
    validate() {
      return this.$refs.form.validate().then(res => {
        this.$emit("on-validated", res, this.model);
        return res;
      });
    }
  }
};
</script>
<style>
    .mivalidate{
      color:#EC7063;  
      font-size: 11px;
    }
    .textarea {
    width: 100%;
    min-height: 200px;
    height: 200px;
  }
</style>