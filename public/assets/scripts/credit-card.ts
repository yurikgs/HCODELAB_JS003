import IMask from "imask"
import { atualizaPreco } from "./functions/atualizaPreco"
import { criaItens } from "./functions/criaItens"
import { formatCurrency } from "./functions/formatCurrency"
import { ServiceOrder } from "./types/serviceOrder"
import { ServicesItem } from "./types/servicesItem"

const page = document.querySelector("#schedules-payment")

if(page) {

    // creditCardDiv
    const creditCardWrapperEl = page.querySelector("#credit-card") as HTMLDivElement
    const creditCardFacesEls = page.querySelectorAll("#credit-card svg")

    // form data entrys
    const number = page.querySelector("input[name='number']") as HTMLInputElement

    const expiry = page.querySelector("input[name='expiry']") as HTMLInputElement
    const cvv = page.querySelector("input[name='cvv']") as HTMLInputElement
    const name = page.querySelector("input[name='name']") as HTMLInputElement
    const bank = page.querySelector("select[name='bank']")
    const installments = page.querySelector("select[name='installments']")
    const document = page.querySelector("input[name='document']") as HTMLInputElement

    // svg credit card fields

    const svgNumber1 = page.querySelector("tspan.number-1") as HTMLElement
    const svgNumber2 = page.querySelector("tspan.number-2") as HTMLElement
    const svgNumber3 = page.querySelector("tspan.number-3") as HTMLElement
    const svgNumber4 = page.querySelector("tspan.number-4") as HTMLElement

    const svgCVV = page.querySelector("tspan.cvv") as HTMLElement
    const svgName = page.querySelector("tspan.name") as HTMLElement
    const svgExpiry = page.querySelector("tspan.expiry") as HTMLElement




    // flip credit card

    creditCardFacesEls?.forEach( face => {
        face.addEventListener('click', e => {
            creditCardWrapperEl.classList.toggle('flipped')
        })
    })



    // Placeholders Config

    number.placeholder = "0000 0000 0000 0000"
    expiry.placeholder = "MM/YY"
    document.placeholder = "000.000.000-00"


    // Credit Card outputs config

    // Number

    number?.addEventListener("keyup", () => {

        const cleanNumber = number.value.replaceAll(" ", "")
        svgNumber1.innerHTML = cleanNumber.substring(0,4)
        svgNumber2.innerHTML = cleanNumber.substring(4,8)
        svgNumber3.innerHTML = cleanNumber.substring(8,12)
        svgNumber4.innerHTML = cleanNumber.substring(12,16)

    })

    

    // Name

    name.addEventListener("keyup", () => {
        svgName.innerHTML = name.value
    })

    // CVV

    cvv.addEventListener("keyup", () => {
        svgCVV.innerHTML = cvv.value
    })

    cvv.addEventListener("focus", () => {
        creditCardWrapperEl.classList.add("flipped")
    })

    cvv.addEventListener("blur", () => {
        creditCardWrapperEl.classList.remove("flipped")
    })

    // Expiry

    expiry.addEventListener("keyup", () => {
        svgExpiry.innerHTML = expiry.value
    })



    // Mask Config

    const year = new Date().getFullYear()
    console.log(year)
    IMask( number, {
        mask: "0000 0000 0000 0000"
    })

    IMask( expiry, {
        mask: "MM/YY",
        blocks: {
            MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12
            },
            YY: {
                mask: IMask.MaskedRange,
                from: String(year).substring(2, 4),
                to: String(year+10).substring(2, 4)
            }
        }
    })

    IMask( cvv, {
        mask: "000"
    })
    IMask( name, {
        mask: "********************"
    })
    IMask( document, {
        mask: "000.000.000-00"
    })
    





    //funcao voltar  -- MELHORAR CONFIGURACAO

    const voltar = () => {
        // href="schedules-services.html"
        history.back()
    }

    page.querySelector("footer.fixed a")?.addEventListener("click", () => {
        voltar()
    })

    // Atualizar resumo
    const resumoEl = page.querySelector("table tbody") as HTMLTableElement

    // validar existencia de currentorder abaixo --- PEND
    let serviceOrder = JSON.parse(localStorage.getItem("currentOrder")||"") as ServiceOrder

    let servicesList = serviceOrder.services as ServicesItem[]

    // string de innerHTML:
    const innerHTML = `<td>nome_servico</td> <td class="price">preco_servico</td>`



    // Renderizacao criacao de elementos html na página

    criaItens (servicesList, resumoEl, "tr", innerHTML, { preco_servico: "price", nome_servico: "name"})


    const pricesElsArray = page.querySelectorAll("tbody td.price") as NodeListOf<HTMLElement>
    const displayTotalEl = page.querySelector("aside span.total") as HTMLElement
    atualizaPreco (pricesElsArray, displayTotalEl)
    


}

