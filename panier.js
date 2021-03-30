// AFFICHAGE DES PRODUIS DANS LE PANIER
// Selection de la balise dans laquelle on va inserer les data du produits choisi
const positionElement = document.querySelector(".container__panier");


// Récuperation des produits du paniers
let panier = JSON.parse(localStorage.getItem("produit"));


// S'il y a des produits dans le panier => on affiche les produits et le formulaire
if (panier){

// Bouche for pour ajouter les produits du panier dans la page panier
structurePanier = "";
panier.forEach((element, i) => {

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
    <input type="text" id="codePostal" name="codePostal" required>

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


// ENVOIE DU FORMULAIRE AU LOCAL STORAGE

// Au clic du bouton envoyer
btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire");
btnEnvoyerFormulaire.addEventListener("click",(e) => {
    e.preventDefault();
    popUpConfirmationCommande();
});

   //    // Fonction pop up de confirmation
   function popUpConfirmationCommande () {
    if ( window.confirm(`Souhaitez vous passer commande ? `) )
    {
         // Mettre les données du formulaire dans un objet
    formulaire = {
        prenom : document.querySelector("#prenom").value,
        nom : document.querySelector("#nom").value,
        adresse : document.querySelector("#adresse").value,
        ville : document.querySelector("#ville").value,
        codePostal : document.querySelector("#codePostal").value,
        email : document.querySelector("#email").value,
    };

    // Création de l'objet qu'il faut envoyer au serveur
    infoPourLeServeur = {
        formulaire,
        panier,
    };

    // // Envoie du formulaire de contact, ainsi que les produits commandés au serveur
    // localStorage.setItem("Commandes",JSON.stringify(infoPourLeServeur));
    // console.log(infoPourLeServeur);

     // Connexion au local storage et récupération du panier
     let commandes = JSON.parse(localStorage.getItem("Commandes"));
     console.log(commandes);
 
     // Si les commandes enregistrées n'est pas vide: alors on y ajoute le nouveau produit et on renvoit le tout 
     if(commandes) {
         commandes.push(infoPourLeServeur);
         localStorage.setItem("Commandes",JSON.stringify(commandes));
         window.location.href = "confirmation.html"
     }
     // S'il est vide, alors on crée un panier
     else {
         commandes = [];
         commandes.push(infoPourLeServeur);
         localStorage.setItem("Commandes",JSON.stringify(commandes));
         window.location.href = "confirmation.html"

         
     };
 
    }
    else { window.location.href = "panier.html";}
}