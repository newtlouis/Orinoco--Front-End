// RECUPERATION DES DONNEES DE L'API
const url="http://localhost:3000/api/teddies";
fetch(url)
.then(res => res.json()
.then(data => {
    affichageProduits(data);
    console.log(data);
}
));



// CREATION DE LA FONCTION POUR AFFICHER LES PRODUITS DANS LA PAGE D'ACCUEIL

function affichageProduits(data) {

// Déclaration des variables de listes de données pour récuperer les éléments de l'API
let id = [];
let nom = [];
let price = [];
let description = [];
let imageUrl = [];
let colors = [];
structureProduit = ""
let positionElement = document.querySelector(".container__accueil"); 
// Boucle for des élements API pour récupéper les données et insérer chaque produit dans la page d'accueil un à un

 data.forEach((element, i) => {
    id[i] =  element._id;
    nom[i] = element.name;
    price[i] = element.price;
    description[i] = element.description;
    imageUrl[i] = element.imageUrl;
    colors[i] = element.colors;

    // Création des textes qu'on va injecter dans le document
    structureProduit += 
    `
    <a href="produit.html?id=${id[i]}">
        <div class="produit">
            <img src="${imageUrl[i]}" alt="">
            <div class="produit__info">
                <ul>
                    <li>Nom: <span>${nom[i]}</span></li>
                    <li>Decription: <span>${description[i]}</span></li>
                    <li>Prix: <span>${price[i]}</span></li>
                    <li>Couleur: <span>${colors[i]}</span></li>
                </ul>
            </div>
        </div>
    </a>
    `
 });

//  console.log(structureProduit);
//  console.log(positionElement);

//  Injection dans la balise du ficher HTML produit
 positionElement.innerHTML = structureProduit;

}