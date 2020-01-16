<template>
  <div class="content">
    <div class="md-layout" v-if="joined">
      <div class="md-layout-item" id="card-chat-w">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>contacts</md-icon>
            </div>
            <h4 class="title">People</h4>
          </md-card-header>
          <md-card-content>
            <div id="contactlistbody">
              <div v-for="(user, index) in users" v-bind:key="user._id">
                <button
                  class="md-button md-rose"
                  @click="updateReceptor(index)"
                >
                  {{ user.usuario }}
                </button>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item" id="chatfield">
        <div>
          <div id="chat-messages" class="" v-html="chatContent"></div>
        </div>
      </div>
    </div>
    <div class="md-layout" v-if="joined">
      <div class="md-layout-item">
        <md-field>
          <label>Message:</label>
          <md-input v-model="newMsg" @keyup.enter="send"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <div class="">
          <button class="md-button md-success" @click="send">
            <i class="material-icons">
              send
            </i>
          </button>
          <div class="md-list">
            <md-list-item href="#" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">attach_file</i>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="#"
                      ><form
                        action="/upload"
                        method="POST"
                        enctype="multipart/form-data"
                        style="height: 100%; width: 100%; top:0; bottom: 0; right: 0; left: 0;"
                      >
                        <input
                          type="file"
                          name="file"
                          id="inputImage"
                          class="form-control"
                          @change="uploadingimages"
                          style="height: 100%; width: 100%; top:0; bottom: 0; right: 0; left: 0; position: absolute; opacity: 0;"
                        />
                        <i class="material-icons">
                          image
                        </i>
                      </form></a
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><form
                        action="/upload"
                        method="POST"
                        enctype="multipart/form-data"
                        style="height: 100%; width: 100%; top:0; bottom: 0; right: 0; left: 0;"
                      >
                        <input
                          type="file"
                          name="file"
                          id="inputFile"
                          class="form-control"
                          @change="uploadingfiles"
                          style="height: 100%; width: 100%; top:0; bottom: 0; right: 0; left: 0; position: absolute; opacity: 0;"
                        />
                        <i class="material-icons">
                          insert_drive_file
                        </i>
                      </form></a
                    >
                  </li>
                </ul>
              </drop-down>
            </md-list-item>
          </div>
          <props-table component-name="drop-down"></props-table>
        </div>
      </div>
    </div>
    <!-- <div class="md-layout" v-if="!joined">
      <div class="md-layout-item">
        <div>
          <input
            type="text"
            v-model.trim="username"
            @keyup.enter="join()"
            class="form-control"
            placeholder="Username"
          />
        </div>
        <div>
          <button class="md-button" @click="join()">
            Entrar
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

import jwtDecode from 'jwt-decode';
import Materialize from 'vue-material';
export default {
  /* data contiene todas las variables que se utilizaran en todo el archivo */
  data() {
    return {
      users: [], //variable donde se almacenan los usuarios existentes para comunicarse
      ws: null, //variable para el websocket
      newMsg: "", //variable para el mensaje
      chatContent: "", //mensajes en el chat
      usuario: {},
      username: null, //usuario personal
      joined: false, //variable para autenticar
      receptor: "", //usuario al que se le enviaran los mensajes
      filesup: false, //indica si se enviara un archivo
      imagesup: false //indica si se enviara una imagen
    };
  },
  created: function() {
    this.getUsuarios();
    this.getUsuario();
  },
  //Se realiza cuando se monta la aplicacion
  mounted: function() {
    //Obtiene los usuarios existentes en la base de datos
    this.join();
  },
  //Metodos de la aplicacion
  methods: {
    //Funcion obtener usuarios
    getUsuarios() {
      this.$http.get("http://localhost:3300/api/usuarios", {
        headers: {
          "X-Access-Token": this.$cookies.get("token")
        }
      }).then(response => {
        this.users = response.data; //se almacena el arreglo de usuarios en la variable users
      });
    },
    getUsuario: function() {
      const baseURI = "http://localhost:3300/api/usuarios";
      let payload = ''
  
      if (this.$cookies.isKey('token')) {
        payload = jwtDecode(this.$cookies.get('token'))
      }

      this.$http
        .get(baseURI + '/' + payload.ID, {
          headers: {
            "X-Access-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          this.usuario = response.data;
          this.username = this.usuario.usuario;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //Funcion para subir archivos al servidor
    uploadingfiles: function() {
      this.filesup = true;
      this.imagesup = false;
      Materialize.toast("Archivo cargado con exito!", 2000);
    },

    //Funcion para subir imagenes al servidor
    uploadingimages: function() {
      this.imagesup = true;
      this.filesup = false;
      Materialize.toast("Imagen cargada con exito!", 2000);
    },

    //Funcion para cambiar el usuario con el que se comunicaran
    updateReceptor: function(e) {
      console.log("entro a la funcion");
      this.receptor = this.users[e].usuario;
      this.ws.close(1000, "Cambio de usuario");
      this.rejoin();
    },

    //Funcion para enviar mensaje
    send: function() {
      if (this.receptor != "") {
        if (this.newMsg != "") {
          this.ws.send(
            JSON.stringify({
              userowner: this.username,
              receptor: this.receptor,
              emisor: this.username,
              message: this.newMsg, // conv to text
              typefile: 0
            })
          );
          this.newMsg = ""; //limpiar "cache" (limpiar variable de mensaje)
        }
        if (this.imagesup) {
          //subir imagen y enviarla
          var inputImage = document.querySelector("#inputImage").files[0];
          console.log(inputImage.name);
          var formData = new FormData();
          formData.append("file", inputImage);
          this.$http.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Access-Token": this.$cookies.get("token")
            }
          });
          this.ws.send(
            JSON.stringify({
              userowner: this.username,
              receptor: this.receptor,
              emisor: this.username,
              message: inputImage.name,
              typefile: 1
            })
          );
          this.imagesup = false;
        }
        if (this.filesup) {
          //subir archivo y enviarla
          var inputFile = document.querySelector("#inputFile").files[0];
          console.log(inputFile.name);
          formData = new FormData();
          formData.append("file", inputFile);
          this.$http.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Access-Token": this.$cookies.get("token")
            }
          });
          this.ws.send(
            JSON.stringify({
              userowner: this.username,
              receptor: this.receptor,
              emisor: this.username,
              message: inputFile.name,
              typefile: 2
            })
          );
          this.filesup = false;
        }
      } else {
        Materialize.toast("Eliga un receptor.", 2000);
      }
    },

    //Reconexion cada vez que se cambia el usuario receptor
    rejoin: function() {
    
      this.ws = new WebSocket("ws://localhost:3300/api/ws");
      var self = this;
      var insideUser = this.username;
      var insideReceptor = this.receptor;

      this.ws.onmessage = function(e) {
        var msg = JSON.parse(e.data);
        var color = "";
        if (
          msg.userowner == insideUser &&
          (msg.emisor == insideReceptor || msg.emisor == insideUser)
        ) {
          if (msg.emisor == insideUser) {
            color = "alert-success";
          } else {
            color = "alert-info";
          }
          if (msg.typefile == 0) {
            self.chatContent +=
              '<div class="card alert ' +
              color +
              '"><div class="body-card">' +
              msg.emisor +
              "->" + //aqui el usuario
              //
              msg.message +
              "</div></div>"; // aqui va el mensaje
            var element = document.getElementById("chat-messages");
            element.scrollTop = element.scrollHeight; //posiciona al fondo
          }
          if (msg.typefile == 1) {
            self.chatContent +=
              '<div class="card alert ' +
              color +
              '"><div class="body-card">' +
              msg.emisor +
              '-> <a href="/files/' +
              msg.message +
              '" download><img src="/files/' +
              msg.message +
              '" height="100" width="100"></a>' + //aqui el usuario
              //
              "</div></div>"; // aqui va el mensaje
            element = document.getElementById("chat-messages");
            element.scrollTop = element.scrollHeight; //posiciona al fondo
          }
          if (msg.typefile == 2) {
            self.chatContent +=
              '<div class="card alert ' +
              color +
              '"><div class="body-card">' +
              msg.emisor +
              '-> <a href="/files/' +
              msg.message +
              '" download>' +
              msg.message +
              "</a>" + //aqui el usuario
              //
              "</div></div>"; // aqui va el mensaje
            element = document.getElementById("chat-messages");
            element.scrollTop = element.scrollHeight; //posiciona al fondo
          }
        }
      };
    },

    //Funcion de autenticacion
    join: function() {
      // if (!this.username) {
      //   Materialize.toast("Escoge nombre de usuario", 2000);
      //   return;
      // }
      var usuarioPropio = -1;
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].usuario == this.usuario) {
          usuarioPropio = i;
        }
      }
      this.users.splice(usuarioPropio, 1);
      this.joined = true;
      this.rejoin();
    }
  }
};
</script>
<style lang="css">
#contactlist {
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 6px;
  color: #333333;
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
#contactlistbody {
  padding: 0.9375rem 1.875rem;
  overflow-y: auto;
  height: 15rem;
}
#chatfield {
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 6px;
  color: #333333;
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
#chat-messages {
  min-height: 10vh;
  height: 60vh;
  overflow-y: auto;
}
#card-chat-w {
  width: 5rem;
}
#ajuste-w {
  width: 100%;
}
</style>
