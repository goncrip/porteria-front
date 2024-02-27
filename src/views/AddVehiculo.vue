<template>
    <Toast></Toast>
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
            <InputText v-model="plate"  placeholder="Matricula" class="w-full md:w-14rem" />
        </div>
        <div class="col-1">
            <Button label="Agregar Matricula" @click="addVehicle"/>
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
    name: 'AddVehiculo',
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
            plate: '',
            selectedCountry:'',
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
    addVehicle()
    {

        if (!this.plate || 
            !this.selectedCountry)
            {
                this.messageService.showCustomError(this.$toast, 'La matricula y el país es obligatorio.');
                return;
            }

        this.entriesService.addVehicle(this.plate, 
                                      this.selectedCountry,  
                                      'token').then(() => {
                                        this.messageService.showOkMessage(this.$toast, 'Se ha creado el registro.')
                                        location.reload()
                                        .catch((e) => {
                                            console.error(e);
                                            this.messageService.showCustomError(this.$toast, 'Ha ocurrido un error al guardar.');
                                        });                                             
        });

    }
}
}
</script>