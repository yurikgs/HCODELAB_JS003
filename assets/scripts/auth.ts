

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


    const emailInput = document.querySelectorAll<HTMLInputElement>("[type='email']")
    emailInput.forEach(input => {
        input.value = sessionStorage.getItem("email") ?? ''
            // nucoalesing operator
    })

}

    //atencao!  load s´funiciona para window!!
window.addEventListener("load", () => {
    render()
})
window.addEventListener("hashchange", () => {
    render()
})









    const forms = document.querySelectorAll("form")
  
    forms.forEach(form => {
        
        
        
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            console.log(form)

            const target = e.target as HTMLElement

            const emailInput = target.querySelectorAll<HTMLInputElement>("[type='email']")

            emailInput?.forEach(input => {
                sessionStorage.setItem("email", input.value)
                console.log(sessionStorage)
            })
        
            const id = target.id

            switch (id) {
                case "auth-email":
                    location.hash = "login"
                    break;
            
                default:
                    location.hash = "auth-email"
                    break;
            }
        
        })


        

    })
