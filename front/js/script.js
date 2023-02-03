import { fetchJSON } from "./functions/api.js";

try {
    const data = await fetchJSON("http://localhost:3000/api/products")
    addKanap(data)
} catch (e) {
    console.error(e)
    document.querySelector("#items").innerHTML = "<h1 style='color: #ff5b5b;' >Erreur 404<br><br>Ressource non trouvée</h1>";
}

function addKanap(data) {
    console.table(data);
    const items = document.querySelector("#items")
    // CREATE ITEMS WITH A LOOP FOR OF
    for (const kanap of data) {

        // CREATE ELEMENT
        const a = document.createElement("a")
        const article = document.createElement("article")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")

        // PERSONNALIZE ELEMENT
        a.href = "./product.html?id=" + kanap._id

        img.src = kanap.imageUrl
        img.alt = kanap.altTxt

        h2.textContent = kanap.name

        p.textContent = kanap.description

        // ADD ELEMENT
        items.append(a)
        a.append(article)
        article.append(img, h2, p)
    };
}