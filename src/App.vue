<template>
    <Toast></Toast>
    <BlockUI :blocked="loadCount < 5 || loading">  
        
        <div class="grid">
            <div class="col-1">

            </div>
            <div class="col-5">
                <Button label="Ir a Reporte" link @click="showReport" v-if="!displayReport"></Button>
                <Button label="Ir a Alta" link @click="showAltas" v-if="!displayAlta"></Button>
            </div>
            <div class="col-1">

            </div>
        </div>
        <div v-show="displayAlta">    
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-10 alignLeft titleBackground p-text-bold">
                    Alta de ingresos
                </div>
                <div class="col-1">
                    
                </div>
            </div>
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-5">
                    <Dropdown v-model="selectedPlate" :options="plates" optionLabel="matricula" placeholder="Matricula" filter class="w-full md:w-14rem" />
                </div>
                <div class="col-1">
                    <Button label="Agregar" @click="showVehicleDialog"/>
                </div>
            </div>
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-5">
                    <Dropdown v-model="selectedPerson" :options="persons" optionLabel="nombres" placeholder="Persona" filter class="w-full md:w-14rem" />
                </div>
                <div class="col-1">
                    <Button label="Agregar" @click="showPersonDialog"/>
                </div>
            </div>
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-5">
                    <Dropdown v-model="selectedCompany" :options="companies" optionLabel="nombre" placeholder="Empresa" filter class="w-full md:w-14rem" />
                </div>
                <div class="col-1">
                    <Button label="Agregar" @click="showCompanyDialog"/>
                </div>
            </div>
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-5">
                    <Dropdown v-model="selectedLoadType" :options="loadTypes" optionLabel="descripcion" placeholder="Carga" filter class="w-full md:w-14rem" />
                </div>
                <div class="col-1">
                    <Button label="Agregar" @click="showLoadTypeDialog"/>
                </div>
            </div>
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-5">
                    <InputText type="number" v-model="peso" placeholder="Peso"></InputText>
                </div>
                <div class="col-1">

                </div>
            </div>
            <div class="grid">
                <div class="col-1">

                </div>
                <div class="col-5">
                    <Button label="Agregar Ingreso" @click="addEntry"/>
                </div>
                <div class="col-1">

                </div>
            </div>

            <Dialog v-model:visible="displayPerson" :dismissableMask="true" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
                <AddPersona></AddPersona>
            </Dialog>
            <Dialog v-model:visible="displayVehicle" :dismissableMask="true" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
                <AddVehiculo></AddVehiculo>
            </Dialog>
            <Dialog v-model:visible="displayCompany" :dismissableMask="true" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
                <AddEmpresa></AddEmpresa>
            </Dialog>
            <Dialog v-model:visible="displayLoadType" :dismissableMask="true" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
                <AddTipoCarga></AddTipoCarga>
            </Dialog>
    </div>
    <div v-show="displayReport">
        <Reporte></Reporte>
    </div>
</BlockUI>
</template>
<script>

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import EntriesService from './services/EntriesService'
import AddPersona from './views/AddPersona.vue'
import AddVehiculo from './views/AddVehiculo.vue'
import AddEmpresa from './views/AddEmpresa.vue'
import AddTipoCarga from './views/AddTipoCarga.vue'
import Reporte from './views/Reporte.vue'
import Toast from 'primevue/toast'
import MessageService from './services/MessageService'
import BlockUI from 'primevue/blockui'

export default {
    name: 'App',
    components:{
    InputText,
    Dropdown,
    Button,
    AddPersona,
    Dialog,
    AddVehiculo,
    AddEmpresa,
    AddTipoCarga,
    Toast,
    Reporte,
    BlockUI
},
    data() {
        return {
            selectedCompany: null,
            selectedPlate: null,
            selectedPerson: null,
            selectedLoadType: null,
            peso: null,
            companies: [ ],
            plates:[ ],
            persons:[ ],
            loadTypes:[ ],
            displayPerson: false,
            displayVehicle: false,
            displayCompany: false,
            displayLoadType: false,
            displayReport: false,
            displayAlta: true,
            loadCount: 0,
            loading: false
    }
  },
  mounted()
  {
    this.loadLists()
  },
  created()
  {
    this.entriesService = new EntriesService()
    this.messageService = new MessageService()
  },
  entriesService: null,
  messageService: null,
  methods:{
    loadLists()
    {
        this.entriesService.getPersonas('token').then(data => {
            this.persons = data;
            this.loadCount++;
        });

        this.entriesService.getEmpresas('token').then(data => {
            this.companies = data;
            this.loadCount++;
        });

        this.entriesService.getTipoCarga('token').then(data => {
            this.loadTypes = data;
            this.loadCount++;
        });

        this.entriesService.getVehiculo('token').then(data => {
            this.plates = data;
            this.loadCount++;
        });

        this.entriesService.getVehiculo('token').then(data => {
            this.plates = data;
            this.loadCount++;
        });
    },
    addEntry()
    {
        this.loading = true

        if (!this.selectedCompany || 
            !this.selectedPlate ||
            !this.selectedPerson ||
            !this.selectedLoadType)
            {
                this.messageService.showCustomError(this.$toast, 'La empresa, mattricula, persona y tipo de carga son obligatorios.');
                return;
            }

        this.entriesService.addEntry(this.selectedCompany.idEmpresa,
                                    this.selectedPlate.idVehiculo,
                                    this.selectedPerson.idPersona,
                                    this.selectedLoadType.idTipoCarga, 
                                    this.peso,
                                    'token').then(() => {
                                        this.messageService.showOkMessage(this.$toast, 'Se ha creado el registro.')
                                        this.loading = false
                                        location.reload()
                                    }).catch((e) => {
                                        console.error(e);
                                        this.messageService.showCustomError(this.$toast, 'Ha ocurrido un error al guardar.');
                                        this.loading = false;
                                    });
    },
    showPersonDialog()
    {
        this.displayPerson = true
    },
    showVehicleDialog()
    {
        this.displayVehicle = true
    },
    showCompanyDialog()
    {
        this.displayCompany = true
    },
    showLoadTypeDialog()
    {
        this.displayLoadType = true
    },
    showReport()
    {
        this.displayReport = true
        this.displayAlta = false
    },
    showAltas()
    {
        this.displayReport = false
        this.displayAlta = true
    }
  }
}
</script>