export function saveBasket(product) {
    localStorage.setItem("basket", JSON.stringify(product))
}

export function getBasket() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    return basket === null ? [] : basket
}

export function addBasket(product) {
    const basket = getBasket()
    // Find product
    const foundProduct = basket.find(p => p._id === product._id && p.color === product.color)

    if (foundProduct === undefined) {
        basket.push(product);
    } else {
        foundProduct.quantity += product.quantity;
    }

    saveBasket(basket)
}