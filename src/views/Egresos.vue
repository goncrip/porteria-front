<template>
    <Toast></Toast>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-10 alignLeft titleBackground p-text-bold">
            Registrar egreso
        </div>
        <div class="col-1">
            
        </div>
    </div>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <Dropdown v-model="selectedEntry" :options="entries"  placeholder="Ingresos" showClear optionLabel="descripcion" filter class="w-full md:w-14rem" />
        </div>
        <div class="col-1">
            <Button label="Registrar Egreso" @click="recordExit"/>
        </div>
    </div>
</template>
<script>

import Button from 'primevue/button'
import Toast from 'primevue/toast'
import EntriesService from '../services/EntriesService'
import MessageService from '../services/MessageService'

export default {
    name: 'Egresos',
    components: {
        Button,
        Toast
    },
    entriesService: null,
    messageService: null,
    data() {
        return {
            entries: [],
            selectedEntry: null
    }
  },
  mounted()
  {
     this.getExit()
  },
  created()
  {
    this.entriesService = new EntriesService()
    this.messageService = new MessageService()
  },
  methods:{
    recordExit()
    {

        if (!this.selectedEntry)
            {
                this.messageService.showCustomError(this.$toast, 'Debe seleccionar un registro.');
                return;
            }

        this.entriesService.addExit(this.selectedEntry.idIngreso,  
                                      'token').then(() => {
                                        this.messageService.showOkMessage(this.$toast, 'Se ha registrado el egreso.')
                                        location.reload()
                                      })
                                        .catch((e) => {
                                            console.error(e);
                                            this.messageService.showCustomError(this.$toast, 'Ha ocurrido un error al guardar.');
                                        })

    },
    getExit()
    {
        this.entriesService.getEgresos('token').then((data) => {
            this.entries = data
        }).catch((e) => {
                console.error(e);
                this.messageService.showCustomError(this.$toast, 'Ha ocurrido un error al guardar.');
            })
    }
}
}
</script>