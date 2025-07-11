export const fetchData = async () => {
    const req = await fetch("data.json")
    const res = await req.json()
    return res
}

export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const handleDialog = () => {
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
}

export const makingBox = (targetAmount, oneBoxValue, progress) => {
    const noOfBoxes = targetAmount / oneBoxValue;
    for (let i = 1; i <= noOfBoxes; i++) {
        const img = document.createElement("img")
        img.setAttribute("src", "/media/locked.png")
        img.classList.add("img");
        const box = document.createElement("div")
        box.appendChild(img)
        box.classList.add('box')
        progress.appendChild(box)
    }
}

export const modifyFilledAndNearBoxes = (filledBoxes, data) => {
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

export const getData = async (fetchData, oneBoxValue) => {
    const fetchedData = await fetchData()
    const data = fetchedData.flatMap((item) => {
        if (item.amount > oneBoxValue) {
            const correctItem = { ...item, amount: oneBoxValue }
            const noOfItem = item.amount / oneBoxValue
            return Array.from({ length: noOfItem }, () => ({ ...correctItem }))
        } else {
            return item
        }
    })

    return data
}

export const getUpdates = async () => {
    const req = await fetch("updates.json")
    const res = await req.json()
    return res
}

export const makingUpdates = (updates) => {
    const updateTable = document.getElementsByClassName("updateTable")[0]
    for (let i = 0; i < updates.length; i++) {
        const update = document.createElement("li")
        update.innerHTML = updates[i]
        updateTable.appendChild(update)
    }
}

export const runDialogForFirstTime = () => {
    const isVisited = localStorage.getItem("isVisited")
    if (!isVisited) {
        const dialog = document.getElementsByClassName('dialog')[0]
        dialog.showModal()
        localStorage.setItem("isVisited",true)
    }
}