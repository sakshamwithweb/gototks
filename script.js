import { fetchData, timeout } from "./module.js"

const main = async () => {
    const targetAmount = 1350;
    const oneBoxValue = 25;
    const progress = document.getElementById("progress")

    const data = await fetchData()

    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    const filledBoxes = Math.floor(totalAmount / oneBoxValue);

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
            box.setAttribute("id", "filled")
        } else {
            box.setAttribute("class", "near")
        }
        console.log(box)
    }
}

main()