import { getBasket } from "./function.js";

const basket = getBasket()
const item = document.querySelector('#item')

async function fetchProduct(basket) {
    for (const product of basket) {
        const res = await fetch('http://localhost:3000/api/products/' + product._id)
        const data = await res.json()

        // console.log(data);
        item.innerHTML += `<article class="cart-item border" data-id="${data._id + product.color}">
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

    const cartItem = document.querySelectorAll('.cart-item')

    cartItem.forEach(a => {
        const btnDelete = a.childNodes[3].childNodes[9]
        btnDelete.addEventListener('click', () => {
            a.remove()
            console.log(basket);
        })
    })
}

fetchProduct(basket)