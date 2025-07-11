import { fetchData, timeout, handleDialog, makingBox, modifyFilledAndNearBoxes, getData, getUpdates, makingUpdates } from "./module.js"

const main = async () => {
    const targetAmount = 1390;
    const oneBoxValue = 25;
    const progress = document.getElementById("progress")

    // Getting correct data, in which splitting >25 into 25s.
    const data = await getData(fetchData, oneBoxValue)
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    const filledBoxes = Math.floor(totalAmount / oneBoxValue);

    // Getting updates
    const updates = await getUpdates()

    // Each value info
    const eachBoxValueElement = document.getElementsByClassName("eachBoxValue")[0]
    eachBoxValueElement.innerText = `Each Box Value: $${oneBoxValue}`

    // All about dialog
    handleDialog()

    // Money Breakdown
    document.getElementsByClassName("totalMoney")[0].innerText = `$${targetAmount}`
    document.getElementsByClassName("collected")[0].innerText = `$${totalAmount}`

    // Making boxes dynamically according to the numbers. Giving img layer upon box.
    makingBox(targetAmount, oneBoxValue, progress)

    await timeout(10) // adding a timeout because for closed image removing with style need little gap. 

    // Modifying boxes such that if it is filled box so add id with tooltip, if it is near so add near class.
    modifyFilledAndNearBoxes(filledBoxes, data)

    // Make updates
    makingUpdates(updates)
}

main()