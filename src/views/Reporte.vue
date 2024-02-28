<template>
    <Toast/>
    
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10 alignLeft titleBackground p-text-bold">
            Consulta de ingresos
        </div>
        <div class="col-1">
            
        </div>
    </div>
    <div class="grid">
        <div class="col-1">
            
        </div>
        <div class="col-2">
            <Calendar v-model="from" dateFormat="dd/mm/yy" placeholder="Fecha desde"/>
        </div>
        <div class="col-2">
            <Calendar v-model="to"  dateFormat="dd/mm/yy" placeholder="Fecha hasta" />
        </div>
        <div class="col-2">
            <Dropdown v-model="selectedEmpresa" :options="companies"  placeholder="Empresa" showClear optionLabel="nombre" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-2">
            <Dropdown v-model="selectedVehicle" :options="plates"  placeholder="Matricula" showClear optionLabel="matricula" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-2">
            
        </div>
    </div>
    <div class="grid">
        <div class="col-1">
            
        </div>
        <div class="col-2">
            <Dropdown v-model="selectedPersona" :options="persons"  placeholder="Persona" showClear optionLabel="nombres" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-2">
            <Dropdown v-model="selectedTipoCarga" :options="loadTypes"  placeholder="Tipo Carga" showClear optionLabel="descripcion" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-2">
            <Button label="Buscar" @click="getEntries"/>
          
        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10">
            <ProgressSpinner style="width: 30px; height: 30px" strokeWidth="8" fill="var(--surface-ground)"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="loading"/>
            <DataTable :value="entries" 
                        tableStyle="min-width: 50rem" 
                        :rows="50"  
                        :paginator="true"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords}" 
                        :loading="loading">
                <Column field="fechaIngreso" header="Ingreso"></Column>
                <Column field="fechaEgreso" header="Egreso"></Column>
                <Column field="empresa" header="Empresa"></Column>
                <Column field="paisMatricula" header="Pais Matricula"></Column>
                <Column field="matricula" header="Matricula"></Column>
                <Column field="documento" header="Documento"></Column>
                <Column field="nombres" header="Nombres"></Column>
                <Column field="apellidos" header="Apellidos"></Column>
                <Column field="tipoCarga" header="Tipo Carga"></Column>
                <Column field="peso" header="Peso"></Column>
            </DataTable>
        </div>
        <div class="col-1">

        </div>
    </div>
</template>
<script>

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Calendar from 'primevue/calendar'
import MessageService from '../services/MessageService'
import EntriesService from '../services/EntriesService'

export default {
        name: 'Reporte',
        components: {
            InputText,
            Button,
            Toast,
            DataTable,
            Column,
            Dropdown,
            Calendar
        },
        props:{
            
        },
        entriesService: null,
        messageService: null,
        data() {
            return {
                entries: [],
                from: new Date(),
                to: new Date(),
                companies: [],
                vehicles: [],
                persons: [],
                loadTypes: [],
                selectedEmpresa: null,
                selectedVehicle: null,
                selectedPersona: null,
                selectedTipoCarga: null,
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
    methods:{
        getEntries()
        {
            this.loading = true
            if (!this.from || !this.to)
            {
                this.messageService.showCustomError(this.$toast, 'La fecha y hasta son obligatorias.');
                return;
            }

            this.entriesService.getIngresos(this.from.toJSON(),
                      this.to.toJSON(),
                      !this.selectedEmpresa ? 0 : this.selectedEmpresa.idEmpresa,
                      !this.selectedVehicle ? 0 : this.selectedVehicle.idVehiculo,
                      !this.selectedPersona ? 0 : this.selectedPersona.idPersona,
                      !this.selectedTipoCarga ? 0 : this.selectedTipoCarga.idTipoCarga,
                      'token').then((data) => {
                                console.log(data)
                                this.entries = data
                                this.loading = false
                            }).catch((e) => {
                                    console.error(e)
                                    this.loading = false
                                    this.messageService.showCustomError(this.$toast, 'Ha ocurrido un error al guardar.')
                                })   

            
            
        },
        loadLists()
        {
            this.entriesService.getPersonas('token').then(data => {
                this.persons = data;
            });

            this.entriesService.getEmpresas('token').then(data => {
                this.companies = data;
            });

            this.entriesService.getTipoCarga('token').then(data => {
                this.loadTypes = data;
            });

            this.entriesService.getVehiculo('token').then(data => {
                this.plates = data;
            });

            this.entriesService.getVehiculo('token').then(data => {
                this.plates = data;
            });
        }
    }
}
</script>