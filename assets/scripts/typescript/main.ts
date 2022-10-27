
const openEl = document.querySelector("#btn-open")
const closeEls = document.querySelectorAll("[data-close='menu']")

const bodyEl = document.querySelector("body")

const menuLinks = document.querySelectorAll(".menu a")

openEl?.addEventListener("click", () => {
    bodyEl?.classList.add("open-menu")
})

closeEls?.forEach( value => {
    value.addEventListener("click", () => {
        bodyEl?.classList.remove("open-menu")
    })
} )

menuLinks?.forEach( value => {
    value.addEventListener("click", event => {
        console.log(event)
    })
})