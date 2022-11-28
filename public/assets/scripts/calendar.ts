
import { format, startOfMonth, addMonths, subMonths, startOfWeek, endOfMonth, endOfWeek, differenceInMilliseconds, addDays } from "date-fns"
import locale from "date-fns/locale/pt-BR"

const page = document.querySelector("#schedules-new")

if(page) {
    const titulo = page.querySelector("h2") as HTMLHeadingElement
    const btnAnterior = page.querySelector(".btn-prev") as HTMLButtonElement
    const btnProximo = page.querySelector(".btn-next") as HTMLButtonElement
    const btnHoje = page.querySelector(".btn-today") as HTMLButtonElement
    const calendario = page.querySelector(".days") as HTMLUListElement
    const hoje = new Date()
    
    let inicioMes = startOfMonth(hoje)
    
    
  
    // Adicionar disabled ao otão de submit
    const submitDisable = () => {
       page.querySelector("button[type='submit']")?.setAttribute("disabled", "true")
    }
    
    
    
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
    
    
            
            // criando evento de click - selected , no li
            li.addEventListener("click", () => {
    
                page.querySelectorAll("li")?.forEach(el => el.classList.remove("selected"))
    
                li.classList.add("selected")
                
                page.querySelector("button[type='submit']")?.removeAttribute("disabled")
                // NAO FUNCIONOU:
                // const calendarSubmit = document.querySelector("[name='calendar-submit']") as HTMLInputElement
    
                // calendarSubmit.formAction = "schedules-time-options.html/teste"
    
                // console.log(calendarSubmit)
                // console.log(calendarSubmit.formAction)
    
    
                page.querySelector("[name='schedule-at']")?.setAttribute("value", li.dataset.schedule ?? "")
    
            })
    
            // linkando o li ao dia correspondente
            li.setAttribute("data-schedule", format(primeiroDia, "dd-MM-yyyy"))
    
            // anexando a li ao calendário (ul)
            calendario.appendChild(li)
            primeiroDia = addDays(primeiroDia, 1)


            submitDisable()
    
    
     
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
    
    
    
    
    
}
