// RECUPERATION DES DONNEES DE L'API
const url="http://localhost:3000/api/teddies";
fetch(url)
.then(res => res.json())
.then(data => {
    try { affichageProduits(data); }
    catch(e) {
        console.dir(e);
        alert("Désolé, une erreur est survenue")
        }
    
    console.log(data);
}
);



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
        <div class="card" style="width: 18rem;">
            <img src="${imageUrl[i]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nom[i]}</h5>
                <p class="card-text">
                    <ul>
                        <li><strong>Nom:</strong> <span>${nom[i]}</span></li>
                        <li><strong>Decription:</strong> <span>${description[i]}</span></li>
                        <li><strong>Prix:</strong> <span>${price[i]/100}€</span></li>
                        <li><strong>Couleur:</strong> <span>${colors[i]}</span></li>
                    </ul>    
                </p>
            </div>
        </div>
    </a>
    `
 });


//  Injection dans la balise du ficher HTML produit
 positionElement.innerHTML = structureProduit;

}