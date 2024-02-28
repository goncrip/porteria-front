<template>
    <Toast/>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <Dropdown v-model="selectedDocumentType" :options="documentTypes"  placeholder="Tipo Documento" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <InputText v-model="document"  placeholder="Documento" class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <Dropdown v-model="selectedCountry" :options="countries"  placeholder="País" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <InputText v-model="mobile" placeholder="Celular" class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <InputText v-model="names" placeholder="Nombres" class="w-full md:w-14rem" />
        </div>
        <div class="col-1">

        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <InputText v-model="surnames" placeholder="Apellidos" class="w-full md:w-14rem" />
        </div>
        <div class="col-1">
            <Button label="Agregar Persona" @click="addPersona"/>
        </div>
    </div>
</template>
<script>

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import EntriesService from '../services/EntriesService'
import MessageService from '../services/MessageService'

export default {
    name: 'AddPersona',
    components: {
        InputText,
        Dropdown,
        Button,
        Toast
    },
    entriesService: null,
    messageService: null,
    data() {
        return {
            selectedDocumentType: '',
            selectedCountry:'',
            document: null,
            mobile: null,
            names: null,
            surnames: null,
            documentTypes: ["CI", "DNI", "Otro"],
            countries: ["UY", "AR", "BR"]

    }
  },
  mounted()
  {
    
  },
  created()
  {
    this.entriesService = new EntriesService()
    this.messageService = new MessageService()
  },
  methods:{
    addPersona()
    {

        if (!this.document || 
            !this.selectedDocumentType || 
            !this.names ||
            !this.surnames ||
            !this.selectedCountry)
            {
                this.messageService.showCustomError(this.$toast, 'El documento, tipo de documento, nombres, apellidos y país son datos obligatorios.');
                return;
            }

        this.entriesService.addPerson(this.document, 
                                      this.selectedDocumentType, 
                                      this.names, 
                                      this.surnames, 
                                      this.selectedCountry, 
                                      this.mobile, 
                                      'token').then(() => {
                                        this.messageService.showOkMessage(this.$toast, 'Se ha creado el registro.')
                                        location.reload()
                                      })
                                        .catch((e) => {
                                            console.error(e);
                                            this.messageService.showCustomError(this.$toast, 'Ha ocurrido un error al guardar.');
                                        })

    }
}
}
</script>