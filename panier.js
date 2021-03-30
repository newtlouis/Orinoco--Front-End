// Selection de la balise dans laquelle on va inserer les data du produits choisi
const positionElement = document.querySelector(".container__panier");


// Récuperation des produits du paniers
let panier = JSON.parse(localStorage.getItem("produit"));


// S'il y a des produits dans le panier => on affiche les produits et le formulaire
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


// Affichage du formulaire
// création du formulaire
structureFormulaire = `
<h2>Remplissez le formulaire pour passer la commande</h2>
    <label for="prenom">Prenom:</label>
    <input type="text" id="prenom" name="prenom" required>

    <label for="nom">Nom:</label>
    <input type="text" id="nom" name="nom" required>

    <label for="adresse">Adresse postale:</label>
    <textarea id="adresse" name="adresse" required></textarea>

    <label for="ville">ville:</label>
    <input type="text" id="ville" name="ville" required>

    <label for="codePostal">Code postal:</label>
    <input type="text" id="codePostal name="codePostal" required>

    <label for="email">Email:</label>
    <input type="text" id="email" name="email" required>

    <button id="envoyerFormulaire" type="submit">Confirmation de la commande</button>
`;
//  Injection dans le fichier HTML
positionFormulaire = document.querySelector(".formulaire");
positionFormulaire.innerHTML = structureFormulaire; 


}

// si le panier est vide: afficher "panier vide"
else {
    positionElement.innerHTML = "Votre panier est vide"
}