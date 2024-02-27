<template>
    <Toast/>
    <div class="grid">
        <div class="col-1">

        </div>
        <div class="col-5">
            <InputText v-model="name"  placeholder="Nombre" class="w-full md:w-14rem" />
        </div>
        <div class="col-1">
            <Button label="Agregar Matricula" @click="addCompany"/>
        </div>
    </div>
</template>
<script>

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import EntriesService from '../services/EntriesService'
import MessageService from '../services/MessageService'


export default {
    name: 'AddEmpresa',
    components: {
        InputText,
        Button,
        Toast
    },
    entriesService: null,
    messageService: null,
    data() {
        return {
            name: ''
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
    addCompany()
    {

        if (!this.name)
            {
                this.messageService.showCustomError(this.$toast, 'El nombre es obligatorio.');
                return;
            }

        this.entriesService.addCompany(this.name,  
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