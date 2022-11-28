
export function customizedAlert( alertName?: string, type?: Object, customizedMessage?: string) {

    if(!alertName&&!type&&!customizedMessage)
    return("Erro: alerta sem mensagem configurada!")

    let message = ""
    

    if(alertName=="invalid_schedule_date") {
        messageSet("Data de agendamento Inválida! Selecione uma nova data no calendario e confirme seu agendamento.")
        alert(message)
    }



    //aux functions

    function messageSet (value: string) {
        customizedMessage!=null?message=customizedMessage:  message=value
    }
}