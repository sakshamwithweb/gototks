import { fetchData, timeout } from "./module.js"

const main = async () => {
    const targetAmount = 1390;
    const oneBoxValue = 25;
    const progress = document.getElementById("progress")

    const eachBoxValueElement = document.getElementsByClassName("eachBoxValue")[0]
    eachBoxValueElement.innerText = `Each Box Value: $${oneBoxValue}`

    const dialog = document.getElementsByClassName('dialog')[0]
    const whatBtn = document.getElementsByClassName("what")[0]
    whatBtn.addEventListener("click", () => {
        dialog.showModal()
    })
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
    const closeWhatBtn = document.getElementsByClassName("close-what")[0]
    closeWhatBtn.addEventListener("click", () => {
        dialog.close()
    })

    const data = (await fetchData()).flatMap((item) => {
        if (item.amount > oneBoxValue) {
            const correctItem = { ...item, amount: oneBoxValue }
            const noOfItem = item.amount / oneBoxValue
            return Array.from({ length: noOfItem }, () => ({ ...correctItem }))
        } else {
            return item
        }
    })

    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    const filledBoxes = Math.floor(totalAmount / oneBoxValue);

    const totalMoney = document.getElementsByClassName("totalMoney")[0].innerText=`$${targetAmount}`
    const collectedMoney = document.getElementsByClassName("collected")[0].innerText = `$${totalAmount}`

    for (let i = 1; i <= targetAmount / oneBoxValue; i++) {
        const img = document.createElement("img")
        img.setAttribute("src", "/media/locked.png")
        img.classList.add("img");

        const box = document.createElement("div")
        box.appendChild(img)
        box.classList.add('box')
        progress.appendChild(box)
    }

    await timeout(10)

    for (let i = 0; i <= filledBoxes; i++) {
        const box = document.getElementsByClassName(`box`)[i]
        if (i < filledBoxes) {
            const tooltipText = document.createElement("span")
            tooltipText.classList.add("tooltiptext")
            tooltipText.innerText = `${data[i].title}: ${data[i].description}`
            box.appendChild(tooltipText)
            box.setAttribute("id", "filled")
            box.classList.add("tooltip")
        } else {
            box.setAttribute("class", "near")
        }
    }
}

main()