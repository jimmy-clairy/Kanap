import { addBasket } from "./functions/function.js";
import { fetchJSON } from "./functions/api.js"

const url = new URL(window.location);
const idKanap = url.searchParams.get('id');

try {
    const data = await fetchJSON(`http://localhost:3000/api/products/${idKanap}`)
    createItem(data)
} catch (e) {
    console.error(e)
    document.querySelector(".item").innerHTML = "<h1 style='color: #ff5b5b;' >Erreur 404<br><br>Ressource non trouvée</h1>";
}

// CREATE OBJET PRODUCT
let product = {
    _id: idKanap
}

// CREATE ITEM
function createItem(data) {
    // SELECTED OR CREATE ELEMENT
    const itemImg = document.querySelector('.item__img')
    const title = document.querySelector('#title')
    const price = document.querySelector('#price')
    const description = document.querySelector('#description')
    const colors = document.querySelector('#colors')
    const img = document.createElement('img')

    // BOUCLE FOR OF CREATE EACH COLOR
    for (const color of data.colors) {
        // CREATE ELEMENT
        const option = document.createElement('option')
        // PERSONNALIZE ELEMENT
        option.value = color
        option.textContent = color
        // ADD ELEMENT
        colors.append(option)
    }

    // PERSONNALIZE ELEMENT
    img.src = data.imageUrl
    img.alt = data.altTxt
    img.width = 700
    img.height = 600
    title.textContent = data.name
    price.textContent = data.price
    description.textContent = data.description

    // ADD ELEMENT
    itemImg.append(img)
}

// LISTENER COLORS
colors.addEventListener("change", () => {
    product.color = colors.value
})

// LISTENER QUANTITY
const quantity = document.querySelector(".item__content-quantity input")
quantity.addEventListener("change", () => {
    product.quantity = Number(quantity.value)
})

// LISTENER ADD TO CART
const btn = document.querySelector('#addToCart')
btn.addEventListener('click', () => {
    verif(product)
})

function verif(product) {
    if (product.color === undefined || product.color === "") {
        return alert("Vous devez choisir une couleur")
    }
    if (product.quantity === undefined || product.quantity < 1 || product.quantity > 100) {
        return alert("Vous devez choisir une quantité entre 1 - 100 articles")
    }

    if (confirm("Votre article a bien etait ajouté voulez vous allez au panier")) {
        window.location = "cart.html"
        quantity.value = 0
    }
    addBasket(product)
}