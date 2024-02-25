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
        <div class="col-10">
            <Dropdown v-model="selectedPlate" :options="plates" optionLabel="Matricula" placeholder="Seleccione matricula" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10">
            <Dropdown v-model="selectedPerson" :options="persons" optionLabel="Documento" placeholder="Seleccione persona" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10">
            <Dropdown v-model="selectedCompany" :options="companies" optionLabel="Nombre" placeholder="Seleccione empresa" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10">
            <Dropdown v-model="selectedLoadType" :options="loadTypes" optionLabel="Descripcion" placeholder="Seleccione carga" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10">
            <InputText type="number" v-model="peso"></InputText>
        </div>
        <div class="col-1">

        </div>
    </div>
    
</template>
<script>

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown';

export default {
    name: 'App',
    components:{
        InputText,
        Dropdown
    },
    data() {
        return {
            selectedCompany: 0,
            selectedPlate: 0,
            selectedPerson: 0,
            selectedLoadType: 0,
            companies: [
                {
                    "IdEmpresa": 2,
                    "Nombre": "Empresa 1"
                }
            ],
            plates:[
                {
                    "IdVehiculo": 1,
                    "Matricula" : "ABC1234",
                    "Pais": "UY"
                },
                {
                    "IdVehiculo": 2,
                    "Matricula" : "IAA1234",
                    "Pais": "UY"
                },
                {
                    "IdVehiculo": 3,
                    "Matricula" : "IAB5878",
                    "Pais": "UY"
                }
            ],
            persons:[
            {
                    "IdPersona" : 2,
                    "TipoDocumento": "CI",
                    "Documento": "45000411",
                    "Pais": "UY",
                    "Celular": "099127950",
                    "Nombres": "Cristian",
                    "Apellidos": "Gonzalez"
                },
                {
                    "IdPersona" : 3,
                    "TipoDocumento": "CI",
                    "Documento": "35040811",
                    "Pais": "UY",
                    "Celular": "095124950",
                    "Nombres": "Pedro",
                    "Apellidos": "Perez"
                },
            ],
            loadTypes:[
                {
                    "IdTipoCarga" : 1,
                    "Descripcion" : "Trigo"
                },
                {
                    "IdTipoCarga" : 2,
                    "Descripcion" : "Ladrillo"
                }
            ],
            peso: 0
    }
  }
}
</script>