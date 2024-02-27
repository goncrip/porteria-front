export default class MessageService {

    showGenericError(toast, message)
    {
        console.warn('Api message: ', message)
        toast.add({severity:'error', summary: 'Error', detail:'Servicio no disponible. Contáctese con el administrador', life: 6000});
    }

    showCustomError(toast, message)
    {
        console.warn('Api message: ', message)
        toast.add({severity:'error', summary: 'Error', detail: message, life: 6000});
    }

    showOkMessage(toast, message)
    {
        toast.add({severity:'success', summary: 'OK', detail: message, life: 6000});
    }
}