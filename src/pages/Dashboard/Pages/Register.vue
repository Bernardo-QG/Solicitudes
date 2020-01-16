<template>
    <div class="md-layout-item">
      <signup-card>
        <h2 class="title text-center" slot="title">Registrar</h2>
       
        <div class="md-layout" slot="content-right"> 
          <md-field class="md-layout-item md-small-size-100 md-size-25" style="margin-right: 25px" v-for="usuario in nom" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-input :v-model="usuario.nameAttr" :type="usuario.type"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-25" style="margin-right: 25px" v-for="usuario in grupo" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
            <md-option value="Administrador">Administrador</md-option>
            <md-option value="Usuario">Usuario</md-option>
            <md-option value="Moderador">Moderador</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px" v-for="usuario in niv" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
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

          <md-field class="md-layout-item md-small-size-100 md-size-20" style="margin-right: 25px" v-for="usuario in pers" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
            <md-option value="Persona">Selecciona una persona</md-option>
           <!-- <md-option v-for="persona in personas" [value]="persona._id">{{persona.nombre}}</md-option>-->
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-23" style="margin-right: 25px" v-for="usuario in usuarios" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-input :v-model="usuario.nameAttr" :type="usuario.type"></md-input>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-23" style="margin-right: 25px" v-for="usuario in act" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
            <md-option value="Si">Si</md-option>
            <md-option value="No">No</md-option>
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-23" style="margin-right: 25px" v-for="usuario in empr" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
            <md-option value="Empresa">Selecciona una empresa</md-option>
           <!-- <md-option v-for="empresa in empresas" [value]="empresa._id">{{empresa.nombre}}</md-option>-->
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-23" style="margin-right: 25px" v-for="usuario in sucur" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
            <md-option value="Sucursal">Selecciona una sucursal</md-option>
           <!-- <md-option v-for="sucursal in sucursales" [value]="sucursal._id">{{sucursal.nombre}}</md-option>-->
            </md-select>
          </md-field>

          <md-field class="md-layout-item md-small-size-100 md-size-23" style="margin-right: 25px" v-for="usuario in puest" :key="usuario.name">
            <label>{{ usuario.name }}</label>
            <md-select :v-model="usuario.nameAttr" :type="usuario.type">
            <md-option value="Puesto">Selecciona un puesto</md-option>
           <!-- <md-option v-for="puesto in puestos" [value]="puesto._id">{{puesto.nombre}}</md-option>-->
            </md-select>
          </md-field>
          
          <md-checkbox v-model="boolean">I agree to the <a>terms and conditions</a>.</md-checkbox>
          <br/>
          <div class="button-container">
            <md-button href class="md-success md-round mt-4" slot="footer">Guardar</md-button>
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
      nombre: null,
      boolean: false,
      idGrupoUsuarios: null,
      nivel: null,
      idPersona: null,
      usuario: null,
      correoElectronico: null,
      clave: null,
      celular: null,
      activo: null,
      idEmpresa: null,
      idSucursal: null,
      idPuesto: null,
      /*Session: null,
      Intentos: null,
      fechaClave: null,
      archivo: null,
      clavePublica: null,
      ultimaIp: null,
      fechaReset: null,
      token: null,
      tiempoToken: null,*/
      nom: [
        {
          
          name: "Nombre",
          nameAttr: "nombre",
          type: "text",
        },
      ],
      grupo: [
        {
          
          name: "id Grupo Usuarios",
          nameAttr: "idGrupoUsuarios",
          type: "text"
        },
      ],
      niv: [
        {
          name:"Nivel",
          nameAttr: "nivel",
          type: "text"
        },
      ],
      pers: [       
        {
          
          name: "id Persona",
          nameAttr: "idPersona",
          type: "text"
        },
      ],
      usuarios:[

        {
          
          name: "Usuario",
          nameAttr: "Usuario",
          type: "text"
        },

        {
          
          name: "Correo Electronico",
          nameAttr: "correoElectronico",
          type: "email"
        },
        {
         
          name: "Contraseña",
          nameAttr: "clave",
          type: "password"
        },

        {
          
          name: "Celular",
          nameAttr: "celular",
          type: "text"
        },
      ],
      act: [
        {
          
          name: "Activo",
          nameAttr: "activo",
          type: "text"
        },
      ],
      empr:[
        {
          
          name: "idEmpresa",
          nameAttr: "idEmpresa",
          type: "text"
        },
      ],
      sucur:[
        {
          
          name: "idSucursal",
          nameAttr: "idSucursal",
          type: "text"
        },
      ],
      puest:[
        {
          
          name: "idPuesto",
          nameAttr: "idPuesto",
          type: "text"
        }
        
      ]
    };
  }
};
</script>
<style></style>
