// AFFICHAGE DES PRODUIS DANS LE PANIER
// Selection de la balise dans laquelle on va inserer les data du produits choisi
const positionElement = document.querySelector(".container__panier");


// Récuperation des produits du paniers
let panier = JSON.parse(localStorage.getItem("panier"));


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

// Fonction pop up de confirmation
function popUpConfirmationCommande () {

    // Si le client confirme la commande, alors on envoie la commande
    if ( window.confirm(`Souhaitez vous passer commande ? `) )
        {

         // Rassemblez les données du formulaire
        formulaire = {
            prenom : document.querySelector("#prenom").value,
            nom : document.querySelector("#nom").value,
            adresse : document.querySelector("#adresse").value,
            ville : document.querySelector("#ville").value,
            codePostal : document.querySelector("#codePostal").value,
            email : document.querySelector("#email").value,
            };

        // Si le texte des données du formulaire est bon, alors on execute le reste du code
        console.log(formulaire.prenom);
        if ( /^[A-Za-z]{3,20}$/.test(formulaire.prenom) && /^[A-Za-z]{3,20}$/.test(formulaire.prenom) ) {console.log("yes")}
        else {console.log("no")};
        
        if ( /^[A-Za-z]{3,20}$/.test(formulaire.prenom) && /^[A-Za-z]{3,20}$/.test(formulaire.nom) && /^[A-Za-z]{3,20}$/.test(formulaire.ville) && /^[0-9]{5}$/.test(formulaire.codePostal) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formulaire.email) )
            {

            // Création de l'objet qu'il faut envoyer au serveur
            infoPourLeServeur = {
                formulaire,
                panier,
            };

            // Envoie du formulaire de contact, ainsi que les produits commandés au serveur

     // Connexion au local storage et récupération du panier
            let commandes = JSON.parse(localStorage.getItem("Commandes"));
            console.log(commandes);
 
            // Si il y a déjà des commandes, alors on y ajoute la nouvelle commande et on renvoit le tout 
            if(commandes) {
                commandes.push(infoPourLeServeur);
                localStorage.setItem("Commandes",JSON.stringify(commandes));

                //  On vide le panier quand la commande est envoyée
                localStorage.removeItem("panier");

                // Redirection vers la page de confirmation
                window.location.href = "confirmation.html"
         
                }
            // S'il n'y a pas encore de commande', alors on crée une commande vide et on la rempli
            else {
                commandes = [];
                commandes.push(infoPourLeServeur);
                localStorage.setItem("Commandes",JSON.stringify(commandes));
         
                //  On vide le panier quand la commande est envoyée
                localStorage.removeItem("panier");

                // Redirection vers la page de confirmation
                window.location.href = "confirmation.html"
        
                };
 
            }
        // Si les données du formulaires sont pas bon, alors pop up alert 
        else{
            console.log("Mauvais");
            alert("Les données du formulaire sont incorrects");
            };

        }
    // Si le client refuse de confirmer la commande, alors on retourne sur la page panier
    else { window.location.href = "panier.html"};
}





