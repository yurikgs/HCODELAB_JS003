import { formatCurrency } from "./formatCurrency"

export function atualizaPreco (priceElsArr: NodeListOf<HTMLElement>, displayTotalEl: HTMLElement) {
    let total = 0
    priceElsArr.forEach( priceEl => {
        let splitStr
        priceEl.innerHTML.includes("&nbsp;")?splitStr="&nbsp;":splitStr=" "
        const price = parseFloat(priceEl.innerHTML.split(splitStr)[1])

        total += price
        console.log(priceEl.innerHTML.split(splitStr))
    } )

    displayTotalEl.innerHTML = formatCurrency(total)
}