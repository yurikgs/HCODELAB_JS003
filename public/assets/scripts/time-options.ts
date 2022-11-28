import { format, parse } from "date-fns"
import locale from "date-fns/locale/pt-BR"
import { TimeOptionsItem } from "./types/timeOptionsItem"
const page = document.querySelector("#time-options")



if(page) {

    const dataInfo = parse(location.search.split("=")[1], 'dd-MM-yyyy', new Date())



    if(String(dataInfo) == 'Invalid Date') {
        location.href = "schedules-new.html"
        
    } else {



        const dataSelecionadaEl = page?.querySelector("form h3") as HTMLHeadingElement

        dataSelecionadaEl.innerText = format(dataInfo, "cccc, dd 'de' MMMM 'de' yyyy", {locale} )


            // populando timeoptions (opções de horários para agendamento)    

            const timeOptions: TimeOptionsItem[] = []
            for (let i=9; i<=15; i++) {
            timeOptions.push({
            name: `${i}:00`,
            value: i
                })
            }

            // Verifiar se há seleções e habilitar o botão:
            const checkedSelectionOption = () => {
                if(page.querySelector("input:checked")){
                console.log("tem checked!")
                console.log(timeOptionsEl.innerHTML)
                // Habilitando o botao principal, de submit
                page.querySelector("button[type='submit']")?.removeAttribute("disabled")
                console.log("remove dis")
                }
            }

            // Adicionar disabled ao otão de submit
            const submitDisable = () => {
                page.querySelector("button[type='submit']")?.setAttribute("disabled", "true")
            }

            // onLoad
            window.addEventListener("load", () => {
                submitDisable()
                render()
                // page.querySelectorAll("button").forEach( button => button.addEventListener( "click", () => {
                //     limpaEstado()
                // }))
            })




            const timeOptionsEl = page.querySelector("form .options") as HTMLInputElement          
            const render = () => {


                

                // Selecionando  schedule_At
                const queriesVar = page.querySelectorAll("input[type='hidden']")

                const scheduleAtEl = queriesVar[0] as HTMLInputElement




                // escrevendo o array timeoptions já populado na div de timeoptions:


                timeOptionsEl.innerHTML = ""
                

                timeOptions.forEach(scheduleOption => {

                    const label = document.createElement("label")
                    label.innerHTML = 
                    `<input type="radio" name="time-option" value="${scheduleOption.value}" />
                    <span>${scheduleOption.name}</span>`

                    
                    label.addEventListener("click", () => {
                        // Configurando scheduleat como querie no próxima url
                        scheduleAtEl.value = location.search.split("=")[1]

                        checkedSelectionOption()

                    })
                    
                    timeOptionsEl.appendChild(label)


                })

                console.log(timeOptionsEl.innerHTML)

                

            }





    }



}


// limpa estado

const limpaEstado = () => {
    console.log("limpar rodou!")
    const checkedInputs = page?.querySelectorAll("inputs:checked") as NodeListOf<HTMLInputElement>
    checkedInputs?.forEach(input => {
        input.checked = false
    })
}



