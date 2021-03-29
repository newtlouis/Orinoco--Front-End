// Selection de la balise dans laquelle on va inserer les data du produits choisi
const positionElement = document.querySelector(".container__panier");


// Récuperation des produits du paniers
let panier = JSON.parse(localStorage.getItem("produit"));

if (panier){

// Bouche for pour ajouter les produits du panier dans la page panier
structurePanier = "";
panier.forEach((element, i) => {
    // id[i] =  element._id;
    // nom[i] = element.name;
    // price[i] = element.price;
    // description[i] = element.description;
    // imageUrl[i] = element.imageUrl;
    // colors[i] = element.colors;

    // Création des textes qu'on va injecter dans le document
    structurePanier += 
    `
    <a href="produit.html?id=${element.idProduit}">
        <div class="produit">
          
            <div class="produit__info">
                <ul>
                    <li>Nom: <span>${element.nomProduit}</span></li>
                    <li>Couleur: <span>${element.optionProduit}</span></li>
                    <li>Prix: <span>${element.prix}€</span></li>
                    <li>Quantité: <span>${element.quantité}</span></li>
                </ul>
            </div>
        </div>
    </a>
    <button class="btn--supprimer">Suprimer</button>


    `
 });
 positionElement.innerHTML = structurePanier;

//  Création du total
total = 0;
panier.forEach(element => {
    total+= element.prix;
} );

console.log(total);

// Insertion du total dans le panier
positionTotal = document.querySelector(".total");
positionTotal.innerHTML = "Total:" + total + "€";

}

// si le panier est vide: afficher "panier vide"
else {
    positionElement.innerHTML = "Votre panier est vide"
}