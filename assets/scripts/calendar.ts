
import { format, startOfMonth, addMonths, subMonths, startOfWeek, endOfMonth, endOfWeek, differenceInMilliseconds, addDays } from "date-fns"
import locale from "date-fns/locale/pt-BR"

const page = document.querySelector("#schedules-new") as HTMLElement

const titulo = page.querySelector("h2") as HTMLHeadingElement
const btnAnterior = page.querySelector(".btn-prev") as HTMLButtonElement
const btnProximo = page.querySelector(".btn-next") as HTMLButtonElement
const btnHoje = page.querySelector(".btn-today") as HTMLButtonElement
const calendario = page.querySelector(".days") as HTMLUListElement
const hoje = new Date()

let inicioMes = startOfMonth(hoje)






const render = () => {
    titulo.innerText = format(inicioMes, 'MMMM yyyy', { locale })

    calendario.innerHTML = ""

    // Nas lis, colocar todos os dias do calenario em ordem crescente
    let primeiroDia = startOfWeek(inicioMes)
    console.log(format(primeiroDia, 'dd/MM/yy'))

    const ultimoDia = endOfWeek(endOfMonth(inicioMes))
    console.log(format(ultimoDia, 'dd/MM/yy'))


    while (differenceInMilliseconds(ultimoDia, primeiroDia) >= 0) {


        // "imprimindo" todos os dias na li

        const li = document.createElement("li")
        li.innerText = format(primeiroDia, "d")
        

        // formatação do li - month-prev, mont-next

        if(format(primeiroDia, "yyyyMM") < format(inicioMes, "yyyyMM")) {
            li.classList.add("month-prev")    
        }
        if(format(primeiroDia, "yyyyMM") > format(inicioMes, "yyyyMM")) {
            li.classList.add("month-next")    
        }
        

        // formatacao do dia corrente

        if(format(primeiroDia, "yyyyMMdd") == format(hoje, "yyyyMMdd")) {
            li.classList.add("active")
        }




        // anexando a li ao calendário (ul)
        calendario.appendChild(li)


        primeiroDia = addDays(primeiroDia, 1)
    }



}




btnAnterior?.addEventListener("click", () => {
    inicioMes = subMonths(inicioMes, 1)
    render()
})

btnProximo?.addEventListener("click", () => {
    inicioMes = addMonths(inicioMes, 1)
    render()
})

btnHoje?.addEventListener("click", () => {
    inicioMes = startOfMonth(hoje)
    render()
})


render()



console.log(titulo.innerText)




