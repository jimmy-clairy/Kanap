fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => addKanap(data))

function addKanap(data) {
    console.table(data);
    const items = document.getElementById("items")

    for (const kanap of data) {
        const a = document.createElement("a")
        const article = document.createElement("article")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")

        a.href = "./product.html?id=" + kanap._id
        img.src = kanap.imageUrl
        img.alt = kanap.altTxt
        h3.textContent = kanap.name
        p.textContent = kanap.description

        items.append(a)
        a.append(article)
        article.append(img, h2, p)
    };
}