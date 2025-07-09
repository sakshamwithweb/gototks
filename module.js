export const fetchData = async () => {
    const req = await fetch("data.json")
    const res = await req.json()
    return res
}

export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}