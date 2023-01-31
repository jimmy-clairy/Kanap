import { addBasket } from "./function.js";

const url = new URL(window.location);
const idKanap = url.searchParams.get('id');

fetch('http://localhost:3000/api/products/' + idKanap)
    .then(res => res.json())
    .then(data => createItem(data))

// CREATE OBJET PRODUCT
let product = {
    _id: idKanap
}

function createItem(data) {
    console.log(data);

    const itemImg = document.querySelector('.item__img')
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const description = document.getElementById('description')
    const colors = document.querySelector('#colors')
    const opt = document.querySelector('#colors option')

    const img = document.createElement('img')

    // Create colors input
    for (const color of data.colors) {
        const option = document.createElement('option')
        option.value = color
        option.textContent = color
        colors.append(option)
    }

    img.src = data.imageUrl
    img.alt = data.altTxt
    img.width = 700
    img.height = 600
    title.textContent = data.name
    price.textContent = data.price
    description.textContent = data.description

    itemImg.append(img)
}


colors.addEventListener("change", () => {
    product.color = colors.value
})

const quantity = document.querySelector(".item__content-quantity input")
quantity.addEventListener("change", () => {
    product.quantity = Number(quantity.value)
})

const btn = document.getElementById('addToCart')

btn.addEventListener('click', () => verif(product))

function verif(p) {

    if (p.color === undefined || p.color === "") {
        return alert("Vous devez choisir une couleur")
    }
    if (p.quantity === undefined || p.quantity < 1 || p.quantity > 100) {
        return alert("Vous devez choisir une quantité entre 1 et 100 articles")
    }

    addBasket(p)

    confirm("Votre article a bien etait ajouté voulez vous allez au panier") ? window.location = "cart.html" : console.log("No redirect cart");
}