
export const IsGetItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const IsSetItem = (key,value) => {
    localStorage.setItem(key,JSON.stringify(value))
}

export const IsRemoveItem = (key) => {
    localStorage.removeItem(key)
}

export const IsClearItem = () => {
    localStorage.clear()
}