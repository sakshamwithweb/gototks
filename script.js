import { fetchData } from "./module.js"

const main = async () => {
    const targetAmount = 1350;
    const oneBoxValue = 25;
    const progress = document.getElementById("progress")

    const data = await fetchData()

    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    const filledBoxes = Math.floor(totalAmount / oneBoxValue);

    for (let i = 1; i <= targetAmount / oneBoxValue; i++) {
        const box = document.createElement("div")
        box.classList.add('box')
        progress.appendChild(box)
    }

    for (let i = 1; i <= filledBoxes; i++) {
        const box = document.getElementsByClassName(`box`)[i]
        box.setAttribute("id", "filled")
        console.log(box)
    }
}

main()