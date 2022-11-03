

const authPage = document.querySelector("main#auth")

// Esonder todos os formulários

const hideAllForms = () => {
    authPage?.querySelectorAll("form").forEach(form =>
        form.classList.add("hide"))
}


// Identificar qual formulário moostrar

// Mostrar o formulário escolhido

const showAuthForm = (id: string) => {
    authPage?.querySelector(`#${id}`)?.classList.remove("hide")
}





    // logica para rodar a funcao assim que a páina carregar (evento "load")
const render = () => {
    hideAllForms()
    const hash = window.location.hash
    console.log("valor ", hash)



    // Rafa fez com switch 

    if(hash!="") {
         // showAuthForm(hash.substring(1, hash.length))
        // ou:
        // showAuthForm(hash.replace("#", ""))
        // ou:
        showAuthForm(hash.slice(1))
    } else {
        showAuthForm("auth-email")
    }




}

    //atencao!  load s´funiciona para window!!
window.addEventListener("load", () => {
    render()
})
window.addEventListener("hashchange", () => {
    render()
})



