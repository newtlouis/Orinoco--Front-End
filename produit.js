// Selection de la balise dans laquelle on va inserer les data du produits choisi
const positionElement = document.querySelector(".container__produit");


// Recupération du numéro id de l'url

const parametreUrl = window.location.search;
const id = parametreUrl.slice(4);
console.log(id);

// Recupération des données du produit avec l'id sélectionné
const url=`http://localhost:3000/api/teddies/${id}`;
fetch(url)
.then(res => res.json()
.then(data => {
    console.log(data);
    nom = data.name;
    description = data.description;
    price = data.price;
    imageUrl = data.imageUrl;
    colors = data.colors;
    console.log(nom);

    structureProduit = 
        `
        <div class="produit">
        <img src="${imageUrl}" alt="">
        <div class="produit__info">
            <ul>
                <li>Nom: <span>${nom}</span></li>
                <li>Decription: <span>${description}</span></li>
                <li>Prix: <span>${price}</span></li>
                <li>Couleur: <span>${colors}</span></li>
            </ul>
        </div>
    </div>
        `
    console.log(structureProduit);

    // Injection dans le document
    positionElement.innerHTML = structureProduit;

}
)
)