import { formatCurrency } from "./functions/formatCurrency"
import { ServicesItem } from "./types/servicesItem"

const page = document.querySelector("#schedules-services")

if(page) {


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



    const render = () => {
        carregaServicos()
        updateResumo()
    }




    // Set checked services
    let checkedServices: ServicesItem[] = []
    const updateCheckedServices = () => {
        
        checkedServices = []

        const checkedServicesInputs = page.querySelectorAll("input:checked") as NodeListOf<HTMLInputElement>

        const serviceIds: number[] = [] 
        

            checkedServicesInputs.forEach( (input) => {
                const value = Number(input.getAttribute("value"))
                if(!isNaN(value)) {
                    serviceIds.push(value)
                }
             })

        console.log(serviceIds)

        services.forEach( service => {
            serviceIds.forEach(id => {
                if(service.id==id)  {
                    checkedServices.push(service)
                    console.log("service id num ", service.id, "é igual ao checked service id num ", id)
                }
            })
        })

        console.log("services: ", services)
        console.log("checkedServices: ", checkedServices)
    }


    const updateResumo = () => {
        
        updateCheckedServices()
        limpaResumo()
        checkedServices.forEach( service => {
            
            const checkedServiceEl = document.createElement("tr")
            checkedServiceEl.innerHTML = `
                                        <td>${service.name}</td>
                                        <td class="price">${formatCurrency(service.price)}</td>
                                        `
            resumoItensEl.appendChild(checkedServiceEl)
            console.log()
        })
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
            label.innerHTML = `     <input type="checkbox" name="service" value="${service.id}" checked />
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
                updateResumo()

            })
            // label.addEventListener("click", () => {
            //     const teste = document.querySelector("aside tbody") as HTMLElement
            //     teste.innerHTML = ""
            // })
            servicesEl.appendChild(label)
        });
        

    }


    // Responsivo do Aside






    // incialização:
    
    render()



}