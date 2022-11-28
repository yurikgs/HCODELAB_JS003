const page = document.querySelector("#change-photo")

if(page) {

    const inputFile = page.querySelector("#file") as HTMLInputElement
    const chooseButton = page.querySelector(".choose-photo") as HTMLButtonElement
    const imagePreview =  page.querySelector("#photo-preview") as HTMLImageElement

    chooseButton.addEventListener("click", () => {
        //hack para usar o input oulto tpe file
        inputFile.click()
    })

    inputFile.addEventListener("change", () => {

        if(inputFile.files?.length) {
            
            // console.log(inputFile.files)

            const file = inputFile.files[0]
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = () => {
                // console.log(reader.result)
                if(reader.result) {
                    imagePreview.src= reader.result as string
                }
            }
    
        }

    })
}