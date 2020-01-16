<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
         
          <h4 class="title">Mis solicitudes</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Por página</label>
                <md-select v-model="pagination.perPage" name="pages">
                  <md-option
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 200px"
                  placeholder="Buscar solicitud"
                  v-model="searchQuery"
                >
                </md-input>
              </md-field>
                 <!-- agregar un nueva solicitud -->
              <md-field>
                  <router-link to="/operaciones/soporte/solicitud/nueva">
                  <md-button class="md-primary" >
                     <span >
                      <md-icon class="material-icons">add</md-icon>
                    </span>
                      &nbsp; Nueva solicitud
                  
                  </md-button>
                </router-link>
              </md-field>   
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="NO."  >{{ item._id }}</md-table-cell>
              <md-table-cell md-label="NOMBRE DE LA SOLICITUD" md-sort-by="nombreSolicitud" class="minombresolicitud">{{  item.nombreSolicitud  }}</md-table-cell>
              <md-table-cell md-label="PRIORIDAD" md-sort-by="prioridad"  :style="colorPrioridad(item.prioridad)">{{ item.prioridad }}</md-table-cell>
              <md-table-cell md-label="FECHA"  md-sort-by="fecha">{{ item.fecha }}</md-table-cell>
              <md-table-cell md-label="ENVIADO" md-sort-by="estatus">{{ item.enviado }}</md-table-cell>
              <md-table-cell md-label="ACCIONES">
                <md-button
                  class="md-just-icon md-info md-simple"
                  @click.native="handleDetalles(item)"
                >
                  <md-icon>details</md-icon><md-tooltip md-direction="top">Detalles</md-tooltip>
                </md-button>
                <router-link :to="{name:'MI SOLICITUD DE SOPORTE', params:{id:item._id}}">
                  <md-button
                    class="md-just-icon md-primary md-simple"
                   
                  >
                    <md-icon>visibility</md-icon><md-tooltip md-direction="bottom">Desplegar</md-tooltip> 
                  </md-button>
                 </router-link>

                 
                 <router-link :to="{name:'EDITAR SOLICITUD', params:{id:item._id}}">
                    <md-button class="md-just-icon md-warning md-simple" >
                      <md-icon>edit</md-icon><md-tooltip md-direction="top">Editar</md-tooltip>
                    </md-button>
                </router-link>
                <md-button
                  class="md-just-icon md-danger md-simple"
                  @click.native="deleteSolicitud(item)"
                >
                  <md-icon>delete</md-icon><md-tooltip md-direction="bottom">Eliminar</md-tooltip>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="footer-table md-table">
           
          </div>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">
              Página {{ from + 1 }} de {{ to }}, No. registros {{ total }}.
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-primary"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>
    <modal v-if="noticeModal" @close="noticeModalHide" footer-classes="justify-content-center"   type="notice">
                <template slot="header">
                  <h4 class="modal-title"><span class="info">SOLICITUD NO.: &nbsp;</span> {{miSolicitud._id}}</h4>
                  <md-button  class="md-simple md-just-icon md-round modal-default-button"   @click="noticeModalHide"          >
                    <md-icon>clear</md-icon>
                  </md-button>
                </template>

                <template slot="body">
                  <p style="text-align: left; white-space: pre-line">
                    <span class="info">NOMBRE:       &nbsp;</span>{{miSolicitud.nombreSolicitud}}<br>
                    <span class="info">EMPRESA:      &nbsp;</span>{{miSolicitud.empresa}}<br>
                    <span class="info">REPORTO:      &nbsp;</span>{{miSolicitud.reporto}}<br>
                    <span class="info">ENVIADO:      &nbsp;</span>{{miSolicitud.enviado}}<br>
                    <span class="info">ESTATUS:      &nbsp;</span>{{miSolicitud.estatus}}<br>
                    <span class="info">DESCRIPCIÓN:  <br>  </span>{{miSolicitud.descripcion}}<br>
                </p>   
                </template>

                <template slot="footer" >
                  <router-link :to="{name:'MI SOLICITUD DE SOPORTE', params:{id:miSolicitud._id}}">
                    <md-button class="md-info md-round " @click="noticeModalHide">¡Desplegar!</md-button>
                  </router-link>
                </template>
      </modal>
  </div>
</template>

<script>
import { Pagination, Modal } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";

export default {
  components: {
    Pagination,
    Modal
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      currentSort: "fecha",
      currentSortOrder: "asc",
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["_id","nombreSolicitud","fecha",  "prioridad"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      noticeModal: false,
      miSolicitud:[]
    };
  },
  methods: {
    colorPrioridad(value){
     
      const myStyle = "font-weight: bold; text-align: center; color:" 
      if(value=="Media") return myStyle+"blue;";
      else if(value=="Alta") return myStyle+"orange; ";
      else if(value=="Urgente") return myStyle+"red; ";
      return myStyle+"green; ";

    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    getMisSolicitudes(){
      
        this.$http.get(this.$serverBackEnd+'/solicitud', {
          headers: { "X-Access-Token": this.$cookies.get("token") }
        })
        .then(response => {
          if(response.data!=null)
          this.tableData = response.data;
        })
        .catch(error => {
          console.log(error); 
        });
       
    },
    deleteSolicitud(item) {

      Swal.fire({
        title: "¡Advertencia!",
        text: `Eliminar la solicitud no. ${item._id} permanentemente.`,
        icon: "warning",
        showCancelButton: true,
      
        confirmButtonText: '¡Confirmo!',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
      
      }).then(result => {
        if (result.value) {
          this.deleteRow(item);
          Swal.fire({
            title: "¡Borrado!",
            text: `El registro seleccionado ha sido eliminado. `,
            icon: "success",
            
            confirmButtonText: 'Entendido',
            
          });
        }
      });
         
    },
    handleDetalles(item){
        this.miSolicitud= item;
        this.noticeModal = true;
    },
    noticeModalHide: function() {
      this.noticeModal = false;
    },
   
    handleEdit(item) {
      Swal.fire({
        title: `You want to edit ${item._id}`,
      
      });
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }

      this.$http.delete(this.$serverBackEnd+'/solicitud/'+item._id, {
          headers: { "X-Access-Token": this.$cookies.get("token") }
          })
          .then(() => {
           this.getMisSolicitudes();
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  mounted() {
    this.getMisSolicitudes();
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: this.propsToSearch,
      threshold: 0.3
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
