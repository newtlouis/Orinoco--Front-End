try { affichageProduitDansPanier() }
catch (e)
    {
    console.dir(e);
    alert("Désolé, une erreur est survenue")
    };

    
try { ecouteBouton() }
catch (e)
    {
    console.dir(e);
    };

// AFFICHAGE DES PRODUIS DANS LE PANIER
function affichageProduitDansPanier(){
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
                <img class="image__panier" src="${element.imgProduit}" alt="">        
                <div class="produit__info">
                    <ul>
                        <li><strong>Produit:</strong> <span>${element.nomProduit}</span></li>
                        <li><strong>Couleur:</strong> <span>${element.optionProduit}</span></li>
                        <li><strong>Prix:</strong> <span>${element.prix}€</span></li>
                        <li><strong>Quantité:</strong> <span>${element.quantité}</span></li>
                    </ul>
                </div>
            </div>
        </a>
        
        


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
    positionTotal.innerHTML = "<strong>Total:</strong> " + total + "€";


    // Affichage du formulaire
    // création du formulaire
    structureFormulaire = `
    <h2>Remplissez le formulaire pour passer la commande</h2>
        
        <span class="erreur__dans__le__formulaire" id="prenomManquant"></span>
        <input id="prenom" name="prenom" class="form-control" type="text" placeholder="Prenom" aria-label="prenom">
        <br/>

        <span class="erreur__dans__le__formulaire" id="nomManquant"></span>
        <input type="text" id="nom" name="nom" class="form-control" type="text" placeholder="Nom" aria-label="prenom">
        <br/>

        <span class="erreur__dans__le__formulaire" id="adresseManquant"></span>
        <textarea id="adresse" name="adresse" class="form-control" type="text" placeholder="Adresse" aria-label="prenom"></textarea>
        <br/>

        <span class="erreur__dans__le__formulaire" id="villeManquant"></span>
        <input type="text" id="ville" class="form-control" type="text" placeholder=Ville aria-label="prenom">
        <br/>

        <span class="erreur__dans__le__formulaire" id="codePostalManquant"></span>
        <input type="text" id="codePostal" name="codePostal" class="form-control" type="text" placeholder="Code postal" aria-label="prenom">
        <br/>

        <span class="erreur__dans__le__formulaire" id="emailManquant"></span>
        <input type="text" id="email" name="email" class="form-control" type="text" placeholder="Email" aria-label="prenom">
        <br/>

        <button id="envoyerFormulaire" class="btn btn-success" type="submit">Confirmation de la commande</button>
        
    `;
    //  Injection dans le fichier HTML
    positionFormulaire = document.querySelector(".formulaire");
    positionFormulaire.innerHTML = structureFormulaire; 


    }

    // si le panier est vide: afficher "panier vide"
    else {
        positionElement.innerHTML = "Votre panier est vide"
    }
};


// ENVOIE DU FORMULAIRE et du panier commandé AU LOCAL STORAGE
function ecouteBouton(){
    // Au clic du bouton envoyer
    btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire");
    btnEnvoyerFormulaire.addEventListener("click",(e) => {
        e.preventDefault();
        popUpConfirmationCommande();
    });
};

// Fonction pop up de confirmation
function popUpConfirmationCommande () {

    // Récuperation des produits du paniers
    let panier = JSON.parse(localStorage.getItem("panier"));

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

        // Fonction de test du prenom
        function prenomControle()
            {
            if  (/^[A-Za-z]{3,20}$/.test(formulaire.prenom))
                {return true}
            else
                {document.querySelector("#prenomManquant").innerHTML = "Veuillez remplir ce champ"
                };
            };
        
        // Fonction de test du nom
        function nomControle()
            {
            if  (/^[A-Za-z]{3,20}$/.test(formulaire.nom))
                {return true}
            else
                {document.querySelector("#nomManquant").innerHTML = "Veuillez remplir ce champ"
                };
            };

                // Fonction de test de l'adresse
        function adresseControle()
            {
            if  (/^[A-Za-z0-9\s]{5,50}$/.test(formulaire.adresse))
                {return true}
            else
                {document.querySelector("#adresseManquant").innerHTML = "Veuillez remplir ce champ"
                };
            };
        // Fonction de test de la ville
        function villeControle()
            {
            if  (/^[A-Za-z]{3,20}$/.test(formulaire.ville))
                {return true}
            else
                {document.querySelector("#villeManquant").innerHTML = "Veuillez remplir ce champ"
                };
            };

        // Fonction de test du code postal
        function codePostalControle()
            {
            if  (/^[0-9]{5}$/.test(formulaire.codePostal))
                {return true}
            else
                {document.querySelector("#codePostalManquant").innerHTML = "Veuillez remplir ce champ"
                };
            };

                    // Fonction de test de l'email
        function emailControle()
        {
        if  (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formulaire.email))
            {return true}
        else
            {document.querySelector("#emailManquant").innerHTML = "Veuillez remplir ce champ"
            };
        };
        
        // Si toutes les données sont vérifiés une à une, alors la commande est envoyée
        if ( prenomControle() && nomControle() && adresseControle() && villeControle() && codePostalControle() && emailControle() )
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





