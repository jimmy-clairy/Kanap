export function saveBasket(product) {
    localStorage.setItem("product", JSON.stringify(product))
}

export function getBasket() {
    const basket = JSON.parse(localStorage.getItem("product"))
    return basket === null ? [] : basket
}

export function addBasket(product) {
    const basket = getBasket()

    // Filter les product
    // const other = basket.filter(a => a._id === product._id && a.color === product.color)

    basket.push(product)
    saveBasket(basket)
}