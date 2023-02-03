import { getBasket, saveBasket } from "./functions/function.js";
import { fetchJSON } from "./functions/api.js";

// CREATE PRODUCT
async function createProduct() {
    const item = document.querySelector('#item')
    const basket = getBasket()

    for (const product of basket) {
        const data = await fetchJSON(`http://localhost:3000/api/products/${product._id}`)

        item.innerHTML += `<article class="cart-item border" data-id="${data._id}" data-color="${product.color}">
                                <img class="cart-item__img" src="${data.imageUrl}" alt="${data.altTxt}" width="350" height="315">
                                <div class="cart-item__content">
                                    <h2 class="cart-item__heading">${data.name}</h2>
                                    <p class="cart-item__color">${product.color}</p>
                                    <p class="cart-item__price">${data.price}<span> €</span></p>
                                    <div class="cart-item__quantity">
                                        <span>Qté : </span>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                    </div>
                                    <a class="cart-item__delete">Supprimer</a>
                                </div>
                            </article>`
    }

    // DELETE PRODUCT
    const btnDelete = document.querySelectorAll(".cart-item__delete")
    btnDelete.forEach(btn => btn.addEventListener("click", () => deleteProduct(btn.parentElement.parentElement)))

    // CHANGE QUANTITY
    const inputQuantity = document.querySelectorAll('.cart-item__quantity input')
    inputQuantity.forEach(c => c.addEventListener('change', (e) => changeQuantity(c.parentElement.parentElement.parentElement, Number(e.target.value))))

    showTotal()
}
createProduct()

// DELETE PRODUCT
function deleteProduct(parent) {
    parent.remove()
    const basket = getBasket();
    const newBasket = basket.filter(b => b._id !== parent.dataset.id || b.color !== parent.dataset.color)
    saveBasket(newBasket)
    showTotal()
}

// CHANGE QUANTITY
function changeQuantity(parent, quantity) {
    const basket = getBasket();
    const foundProduct = basket.find(p => p._id === parent.dataset.id && p.color === parent.dataset.color)
    if (foundProduct) { foundProduct.quantity = quantity }

    saveBasket(basket)
    showTotal()
}

// TOTAL PRODUCT
function totalProduct() {
    let total = 0;
    const basket = getBasket();
    for (const product of basket) {
        total += product.quantity
    }
    return total
}

// TOTAL PRICE
async function totalPrice() {
    let total = 0
    const basket = getBasket()
    for (const product of basket) {
        const data = await fetchJSON(`http://localhost:3000/api/products/${product._id}`)
        total += data.price * product.quantity
    }
    return total
}

// SHOW TOTAL
async function showTotal() {
    document.querySelector('#totalQuantity').textContent = totalProduct()
    document.querySelector('#totalPrice').textContent = await totalPrice()
}