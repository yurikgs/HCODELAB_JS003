import { customizedAlert } from "./functions/customizedAlert"
import { formatCurrency } from "./functions/formatCurrency"
import { ServiceOrder } from "./types/serviceOrder"
import { ServicesItem } from "./types/servicesItem"

const page = document.querySelector("#schedules-services")

if(page) {

    //LocalStorage
    let serviceOrder = {} as ServiceOrder



    const updtServiceOrder = () => {
        const localStorageserviceOrder = localStorage.getItem("currentOrder")
        localStorageserviceOrder?serviceOrder=JSON.parse(localStorageserviceOrder):serviceOrder

        console.log("serviceOrder: ", serviceOrder)

    }
    updtServiceOrder()




    // Data/ hora set
    const locationSearchArr = location.search?.split("?")
    const locationDateQueriesArr = locationSearchArr[1]?.split("&")

    let hora = ""
    let dia = ""

    const retornaData = () : Date | null => {

        locationDateQueriesArr?.forEach( querie => {
            querie.includes("time-option")?hora=querie.split("=")[1]:hora=hora
            querie.includes("schedule-at")?dia=querie.split("=")[1]:dia=dia
        })

        const destructuredSachedule = dia.split("-")
        let data = new Date(`${destructuredSachedule[2]}, ${destructuredSachedule[1]}, ${destructuredSachedule[0]}, ${hora}:00:00`)

        if(String(data)=="Invalid Date") {

            if(localStorage.getItem("currentOrder")) {
                updtServiceOrder()
                // "falha" do typescript --- a condicao do if já garante que n vai ser nulo

                if(serviceOrder.scheduledAt) {
                    data = serviceOrder.scheduledAt
                    return data
                }
                
            } 

            return null

        } else {
            return data
        }


            

    }

    // verify date
    const locationDate = retornaData()
    if(!locationDate) {
        customizedAlert("invalid_schedule_date")
        location.assign("./schedules-new.html")
    } else {



    // console.log(localStorage.getItem("currentOrder"))
    
    
    
    // Config

    const services: ServicesItem[] = [{
        id:1,
        name: "Revisão",
        description: "Verifiação mínima necessária",
        price: 100
    },
    {
        id:2,
        name: "Alinhamento",
        description: "Verifiação mínima necessária",
        price: 100
    },
    {
        id:3,
        name: "Filtros",
        description: "Verifiação mínima necessária",
        price: 100
    },]


    const servicesEl = page.querySelector("form .options") as HTMLElement








    // Set checked services
    let checkedServices: ServicesItem[] = []
    const updateCheckedServices = () => {
        
        checkedServices = []
        
        const checkedServicesInputs = [] as HTMLInputElement[]
        const servicesInputs = page.querySelectorAll("input")
        servicesInputs.forEach(input => {
            if(input.checked==true){
                checkedServicesInputs.push(input)
                console.log("input: ", input)
            }
        })


        const serviceIds: number[] = [] 
        

            checkedServicesInputs.forEach( (input) => {
                const value = Number(input.getAttribute("value"))
                if(!isNaN(value)) {
                    serviceIds.push(value)
                }
             })


            serviceIds.forEach(id => {
                const service = services.find((item, index) => {
                    return item.id === id
                }) as ServicesItem
                checkedServices.push(service)
            })

            displayTotal()

    }


    const updateResumo = () => {

        updtServiceOrder()

        // correcao de erro no console
        let length
        try {
            length = serviceOrder.services.length
        } catch {
            length = null
        }
        if(!length) {

            updateCheckedServices()
            limpaResumo()
            updateCheckedServices()
            checkedServices?.forEach( service => {
                
                const checkedServiceEl = document.createElement("tr")
                checkedServiceEl.innerHTML = `
                                            <td data-serviceId="${service.id}">${service.name}</td>
                                            <td class="price">${formatCurrency(service.price)}</td>
                                            `
                resumoItensEl.appendChild(checkedServiceEl)

            })
        }  else {

            limpaResumo()
            updtServiceOrder()
            console.log("serviceOrder.services : ", serviceOrder.services)

            const inputsEls = page.querySelectorAll("input")
            const selectedInputsEls: HTMLInputElement[] = []
            inputsEls.forEach( input => {
            
                //limpa inputs
                // input.checked=false
                serviceOrder.services.forEach( service => {
                    console.log("inputs td:", input.querySelector("td"))

                    if(input.value==servicesEl.id) {
                        input.checked = true

                        console.log("serviceOrder.services : ", serviceOrder.services)
                        console.log("input: ", input, " service.id: ", service.id)
                    }

                })

            })
            // updateCheckedServices()



            serviceOrder.services.forEach( service => {

                const serviceEl = document.createElement("tr")
                serviceEl.innerHTML = `
                <td data-serviceId="${service.id}">${service.name}</td>
                                            <td class="price">${formatCurrency(service.price)}</td>
                                            `
                resumoItensEl.appendChild(serviceEl)

            })
        }

    }




    const limpaFormularios = () => {
        servicesEl.innerHTML = ""
    }


    // Configuração do Resumo aside

    const resumoItensEl = page.querySelector("tbody") as HTMLTableSectionElement
    const limpaResumo = () => {
        resumoItensEl.innerHTML = ""
    }


    const carregaServicos = () => {
        limpaFormularios()
        services.forEach( service => {
            const label = document.createElement("label")
            label.innerHTML = `     <input type="checkbox" name="service" value="${service.id}" />
                                    <div class="square">
                                        <div></div>
                                    </div>
                                    <div class="content">
                                        <span class="name">${service.name}</span>
                                        <span class="description">${service.description}</span>
                                        <span class="price">R$${formatCurrency(service.price)}</span>
                                    </div>      `

            const input = label.querySelector("input") as HTMLInputElement
            input.addEventListener("change", () => {

                // Autoset do Formulario de Resumo
                limpaResumo()
                submitData()
                updateResumo()
                page.querySelector("button[type='submit']")?.removeAttribute("disabled")

                // submitData()

            })
            // label.addEventListener("click", () => {
            //     const teste = document.querySelector("aside tbody") as HTMLElement
            //     teste.innerHTML = ""
            // })
            servicesEl.appendChild(label)
        });
        

    }

    // Cálculo e display do total

    const displayTotal = () => {
        // Calculando total
        const prices: number[] = []
    


        checkedServices.forEach( service => {
            prices.push(service.price)
        })
        
        console.log(prices)
        const total = prices.reduce((prev, next) => 
            prev + next, 0)

        // Mostrando Total na tela
        const totalEl = page.querySelector("span.total") as HTMLSpanElement
        totalEl.innerText = formatCurrency(total)
    }

    // Adicionar disabled ao otão de submit

    const submitDisable = () => {
    page.querySelector("button[type='submit']")?.setAttribute("disabled", "true")
    }


    // Onsubmit  --  salvar entidade de Ordem de Servico
    // Ref: http://localhost:3000/schedules-services.html?time-option=10&schedule-at=31-10-2022

    page.querySelector("button[type='submit']")?.addEventListener("click", (e) => {
        //DEESCOBRIR PQ O SUBMIT NAO ESTA FUNCCIONANDO AQUI

        submitData()
    })
    
    console.log(page.querySelector("button[type='submit']"))
    
    const submitData = () => {

        // verificando configrando data
        console.log("submitData")
        const data = retornaData()

        if(data) {

            updateCheckedServices()
            serviceOrder = {
                scheduledAt: data as Date,
                services: checkedServices
            }
    
            console.log("serviceOrder: ", serviceOrder)
    
            localStorage.setItem("currentOrder", JSON.stringify(serviceOrder))
            console.log("submited!")
            console.log(localStorage.getItem("currentOrder"))

        } else {
            customizedAlert("invalid_schedule_date")
            location.assign("./schedules-new.html")
        }
    }
    



    // Botao Voltar:

    const voltar = () => { 
         location.assign("schedules-time-options.html")
    }

    page.querySelector("footer.fixed a")?.addEventListener("click", () => {
        voltar()
    })


    // Responsivo do Aside



    // incialização:
    
    const render = () => {
        carregaServicos()
        submitDisable()
        updateResumo()
    }



    render()






    }


}