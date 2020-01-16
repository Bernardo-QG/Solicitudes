<template >
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          
          
          <router-link to="/operaciones/soporte/solicitud">   
            <md-button class="md-icon-button md-raised md-accent pull-right ">
                <md-icon class="material-icons">keyboard_backspace</md-icon>
            </md-button>
          </router-link>
          <h4 class="title"><span class="info">SOLICITUD NO.:&nbsp;</span> {{ solicitud._id}}</h4>
         
        </md-card-header>
        <md-card-content >

             <div class="md-layout">
             
                     <div class="md-layout-item md-size-70 mitexto">
                             <h3 class="card-title nombresolicitud"><span class="info">NOMBRE DE LA SOLICITUD:&nbsp;</span> {{solicitud.nombreSolicitud}}</h3>
                           
                              <hr>

                            <p class="rutareferencia"><span class="info">RUTA DE REFERENCIA:</span>&nbsp; <i>{{solicitud.rutaReferencia}}</i><p>
                            <p style="white-space: pre-line"><span class="info">DESCRIPCIÓN:    <br> </span>{{ solicitud.descripcion }}</p>
                            
                            <hr>
                             <div class="d-flex flex-row">
                               
                            <md-button  class="md-info md-fileinput" >
                                <md-icon class="material-icons">add</md-icon>
                                <template>Archivo</template>     
                                <input type="file" id="file" ref="file" @change="handleFileUpload()" />
                                <md-tooltip md-direction="top">Agregar nueva archivo</md-tooltip>   
                            </md-button>
                            &nbsp;

                            <md-button  class="md-info" @click="nuevaObservacion()">
                                <md-icon class="material-icons">add</md-icon>
                                <template>Observación</template>   
                                <md-tooltip md-direction="top">Agregar nueva observación</md-tooltip>   
                            </md-button>
                             &nbsp;
                             <md-button  v-if="solicitud.enviado=='No'" class="md-success" @click="enviarSolicitud()">
                                <md-icon class="material-icons">send</md-icon>   
                                <template></template>
                                <md-tooltip md-direction="top">Enviar la solicitud a soporte</md-tooltip>   
                            </md-button>

                           
                           

                            
                            </div>
                            <!-- Agregar archivo nuevo   -->
                            <div v-if="siArchivo" class="md-layout md-alignment-top-center" >
                                <md-field class="md-layout-item md-size-85">
                                    <label>Nombre del nuevo archivo</label>
                                    <md-input v-model="miArchivo.name" disabled></md-input>
                                </md-field>                                
                                <md-button class="md-layout-item md-size-5 md-icon-button md-simple md-round md-primary" @click="subirArchivo()">
                                    <md-icon class="material-icons">cloud_upload</md-icon>   
                                    <template></template>
                                    <md-tooltip md-direction="top">Subir nuevo archivo</md-tooltip> 
                                </md-button>
                                <md-button class="md-layout-item md-size-5 md-icon-button md-simple md-round md-danger" @click="cancelarArchivo()">
                                    <md-icon class="material-icons">backspace</md-icon>   
                                    <template></template>
                                    <md-tooltip md-direction="top">Cancelar</md-tooltip> 
                                </md-button>
                                                                                              
                            </div>
                            <!-- Agregar nueva observacion  -->

                            <div v-if="siObservacion" class="md-layout md-alignment-top-center">
                                <md-field class="md-layout-item md-size-85" >
                                    <label>Obsercación</label>
                                    <md-textarea class="mitextarea"  name="observacion" v-model="miObservacion"></md-textarea>
                                </md-field>
                                <md-button class="md-layout-item md-size-5 md-icon-button md-simple md-round md-primary" @click="subirObsercacion()" >
                                    <md-icon class="material-icons">cloud_upload</md-icon>   
                                    <template></template>
                                    <md-tooltip md-direction="top">Subir nueva observación</md-tooltip> 
                                </md-button>
                                <md-button class="md-layout-item md-size-5 md-icon-button md-simple md-round md-danger"  @click="cancelarObsercacion()" >
                                    <md-icon class="material-icons">backspace</md-icon>   
                                    <template></template>
                                    <md-tooltip md-direction="top">Cancelar</md-tooltip> 
                                </md-button>                                
                            </div>
                            
                           

                    </div>
                    <div class="md-layout-item md-size-30">
                         <div >
                               <p>
                                <span class="info">EMPRESA:      &nbsp;</span><i>{{solicitud.empresa}}  </i><br>
                                <span class="info">REPORTO:      &nbsp;</span><i>{{solicitud.reporto}}  </i><br>
                                <span class="info">FECHA:        &nbsp;</span><i>{{solicitud.fecha}}    </i><br>
                                <span class="info">PRIORIDAD:    &nbsp;</span><i>{{solicitud.prioridad}}</i><br>
                                <span class="info">ENVIADO:      &nbsp;</span><i>{{solicitud.enviado}}  </i><br>
                                <span class="info">ESTATUS:      &nbsp;</span><i>{{solicitud.estatus}}  </i><br>
                            
                            </p>                         
                         </div>                   
                    </div>
             </div>       
             <div class="md-layout">
                     <div class="md-layout-item md-size-100 mitexto">
                            <md-list >
                                
                                <md-list-item md-expand >
                                    <md-icon>folder</md-icon>
                                    
                                    <div class="md-list-item-text">Archivos +{{tableDataArchivos.length}}</div>
                                    <md-table slot="md-expand" v-model="tableDataArchivos" table-header-color="purple">
                                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                                        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                                        <md-table-cell md-label="Nombre"><a :href="item.linkdownload"  target="_blank" download>{{ item.nombre }}</a></md-table-cell>
                                        <md-table-cell md-label="Estado">
                                            <span v-if="item.estado == 'Enviado'"  class="enviado">{{item.estado}}</span>
                                            <span v-if="item.estado == 'Recibido'" class="recibido">{{item.estado}}</span>
                                        
                                        </md-table-cell>
                
                                        </md-table-row>
                                    </md-table>
                
                                </md-list-item>

                                <md-list-item md-expand>
                                <md-icon>assignment</md-icon>
                                 <div class="md-list-item-text">Obsercaciones +{{tableDataObservaciones.length}}</div>

                                <md-table slot="md-expand" v-model="tableDataObservaciones" table-header-color="purple">
                                        <md-table-row slot="md-table-row" slot-scope="{ item }">
                                        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                                        <md-table-cell md-label="Fecha">{{ item.fecha }}</md-table-cell>
                                        <md-table-cell md-label="Obsercacion"> {{item.observacion}} </md-table-cell>
                                        <md-table-cell md-label="Usuario"> {{item.usuario}} </md-table-cell>
                
                                        </md-table-row>
                                    </md-table>
                                </md-list-item>

                             
                            </md-list>
                     </div>
            </div>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          
        </md-card-actions>
      </md-card>
    </div>
      
  </div>
</template>

<script>

import Swal from "sweetalert2";
export default {

   mounted(){
        this.tablecountArchivos+=this.tableDataArchivos.length;
        this.tablecountObservaciones+=this.tableDataObservaciones.length;
        this.getSolicitud();
  
    },
  data() {
    return {
            solicitud:{},
            tablecountArchivos: "Archivos +",
            tablecountObservaciones: "Obsercaciones +",
            tableDataArchivos: [{
                id:1,
                nombre: '1234123123123.jpg',
                linkdownload:'http://sicap.mx/img/about/logo3.png',
                estado: 'Enviado',
                }, {
                id:2,
                nombre: '1341324123412.jpg',
                linkdownload:'http://sicap.mx/img/about/logo3.png',
                estado: 'Recibido',
                }, {
                id:3,
                nombre: '2344234233123.jpg',
                linkdownload:'http://sicap.mx/img/about/logo3.png',
                estado: 'Enviado',
                }, {
                id:4,
                nombre: '2342342123412.jpg',
                linkdownload:'http://sicap.mx/img/about/logo3.png',
                estado: 'Recibido',
                }
            ],
            tableDataObservaciones: [{
                id:4,
                fecha: '2020-01-01',
                observacion: 'Agregar nuevo usuario',
                usuario:'Bernardo'
                }, {
                     id:5,
                fecha: '2020-01-02',
                observacion: 'Eliminar reguistro 234234',
                usuario:'Martin'
                }, {
                     id:6,
                fecha: '2020-01-03',
                observacion: 'Vacaciones xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx',
                usuario:'Bernardo'
                }
            ],
           
            miArchivo:null,
            siArchivo:false,
            miObservacion:'',
            siObservacion: false                 
      
    }
  },
  methods: {
   getSolicitud(){
      
        this.$http.get(this.$serverBackEnd+'/solicitud/'+this.$route.params.id, {
          headers: { "X-Access-Token": this.$cookies.get("token") }
        })
        .then(response => {
          this.solicitud=response.data;
          
        })
        .catch(error => {
          console.log(error); 
        }); 
       
   },
   enviarSolicitud(){
     this.solicitud.enviado='Si';
     this.$http.put(this.$serverBackEnd+'/solicitud/'+this.$route.params.id,this.solicitud, {
          headers: { "X-Access-Token": this.$cookies.get("token") }
        })
        .then(response => {
          this.solicitud=response.data;
          //this.$router.push('/operaciones/soporte/solicitud');    
          Swal.fire({
            icon: 'success',
            title: 'Solicitud de soporte enviada correctamente.',
            showConfirmButton: false,
            timer: 2500
          });
        })
        .catch(error => {
          console.log(error); 
          Swal.fire({
            icon: 'error',
            title: 'Solicitud de soporte enviada incorrectamente.',
            showConfirmButton: false,
            timer: 2500
          });
        }); 
   },
   handleFileUpload(){
        this.miArchivo = this.$refs.file.files[0];
        this.siArchivo=true;
        console.log(this.miArchivo);
   },
   
   subirArchivo(){
           /*let formData = new FormData();
            formData.append('file', this.miArchivo);
  
            axios.post('http://localhost/FileAxios/api.php',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(data){
              console.log(data.data);
            })
            .catch(function(){
              console.log('FAILURE!!');
            });*/

            this.miArchivo=null;
            this.siArchivo=false;
    },
    cancelarArchivo(){
    this.miArchivo=null;
    this.siArchivo=false;
    },
    handleExplorar (index, row) {
        alert(`Revisar archivo:  `+row.nombre);
    },
    nuevaObservacion(){
        this.siObservacion= true;
    },
    subirObsercacion(){
        this.siObservacion= false;
        alert("Subir nueva observación.");
        this.miObservacion='';
    },
    cancelarObsercacion(){
        this.siObservacion=false;
        this.miObservacion='';
    },
    reasignarUsuario(){
        this.siReasignar=true;
    },
    aceptarReasignacion(){
        this.siReasignar=false;
        this.miUsuario='';
    },
    cancelarReasignacion(){
        this.siReasignar=false;
        this.miUsuario='';
    }
                       
  }
};
</script>
<style lang="scss">
 .info{
     font-size:11px;
     font-weight: bold;
     
 }
 .nombresolicitud{
     color: #01579B;
 }
 .rutareferencia{
     color: #00838F;
     font-size:12px;
 }
 .el-table .td-actions{
    button.btn {
      margin-right: 5px;
    }
  }
  .enviado{
      color:#148F77;
      font-weight: bold;
  }
  .recibido{
      color:#6C3483;
      font-weight: bold;
  }
  .mitextarea {
    min-height: 150px;
    height: 150px;
  }
  .mitexto{
      line-height: 12pt;        /* para la separacion entre lineas */ 
  }
  
</style>