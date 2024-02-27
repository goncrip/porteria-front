<template>
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
    AddTipoCarga
},
    data() {
        return {
            selectedCompany: 0,
            selectedPlate: 0,
            selectedPerson: 0,
            selectedLoadType: 0,
            companies: [ ],
            plates:[ ],
            persons:[ ],
            loadTypes:[ ],
            peso: null,
            displayPerson: false,
            displayVehicle: false,
            displayCompany: false,
            displayLoadType: false
    }
  },
  mounted()
  {
    this.loadLists()
  },
  created()
  {
    this.entriesService = new EntriesService()
  },
  entriesService: null,
  methods:{
    loadLists()
    {
        this.entriesService.getPersonas('token').then(data => {
            console.log(data);
            this.persons = data;
        });

        this.entriesService.getEmpresas('token').then(data => {
            console.log(data);
            this.companies = data;
        });

        this.entriesService.getTipoCarga('token').then(data => {
            console.log(data);
            this.loadTypes = data;
        });

        this.entriesService.getVehiculo('token').then(data => {
            this.plates = data;
            console.log(data);
        });

        this.entriesService.getVehiculo('token').then(data => {
            console.log(data);
            this.plates = data;
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
    }
  }
}
</script>