// Selection de la balise dans laquelle on va inserer les data du produits choisi
const positionElement = document.querySelector(".container__produit");


// Recupération du numéro id du produit à partir de l'url
const parametreUrl = window.location.search;
const id = parametreUrl.slice(4);

// Recupération des données du produit avec l'id sélectionné
const url=`http://localhost:3000/api/teddies/${id}`;
fetch(url)
.then(res => res.json())
.then(data => {
    // Affichage du produit dans la page produit
    try { affichageProduit(data) }
    catch (e)
        {
        console.dir(e);
        alert("Désolé, une erreur est survenue")
        }
    })

// ENVOI DU PANIER
try { envoiAuPanier() }
catch (e)
    {
    console.dir(e);
    alert("Désolé, une erreur est survenue")
    }

// fonction d'insertion des élements dans la page produit   
function affichageProduit (data) {
    // variable à inserer
    nom = data.name;
    description = data.description;
    price = data.price;
    imageUrl = data.imageUrl;
    colors = data.colors;
    

    // HTML à inserer

    // Liste de couleur
    htmlCouleurs = `<select name="Selection de couleur" id="couleurs">`;
    colors.forEach((element, i) => {
        htmlCouleurs +=
        `
        <option value="${colors[i]}">${colors[i]}</option>
        
        ` }
    
    );
    htmlCouleurs += `</select> `;


    structureProduit = 
    
        `
        <div class="row produit">
            <div class ="col-md-6">
                <img src="${imageUrl}" class="img-fluid" alt="...">
               
            </div>

            <div class ="col-md-6">
                <div class="produit__info">
                <ul>
                    <li><strong>Nom:</strong> <span>${nom}</span></li>
                    <li><strong>description:</strong> <span>${description}</span></li>
                    <li><strong>Prix:</strong> <span>${price/100}€</span></li>
                    <li><strong>Couleurs disponibles:</strong>` + ` ${htmlCouleurs}`+` 
                </ul>
                </div>
            </div>

        </div>
        `
    // console.log(structureProduit);

    // Injection dans le document
    positionElement.innerHTML = structureProduit;

};



// Fonction envoie du panier
function envoiAuPanier() {
    // Selection du bouton panier
    const btnEnvoyerPanier = document.querySelector("#button__panier");

    // ecoute du panier
    btnEnvoyerPanier.addEventListener("click",(e) => {
        e.preventDefault();

        // Choix de l'option
        idForm = document.querySelector("#couleurs");
        let optionChoice = idForm.value;
        
        // Création de l'objet qu'on enverra au serveur
        let optionProduit = {
            nomProduit : nom,   
            idProduit : id,
            optionProduit : optionChoice,
            quantité : 1,
            prix : price/100,
            imgProduit : imageUrl,
        };
        

        // Connexion au local storage et récupération du panier
        let panier = JSON.parse(localStorage.getItem("panier"));
        console.log(panier);

        // Si le panier n'est pas vide: alors on y ajoute le nouveau produit et on renvoit le tout 
        if(panier) {
            panier.push(optionProduit);
            localStorage.setItem("panier",JSON.stringify(panier));
            confirmationProduit();
        }
        // S'il est vide, alors on crée un panier
        else {
            panier = [];
            panier.push(optionProduit);
            localStorage.setItem("panier",JSON.stringify(panier));
            confirmationProduit();
            
        }

        // Fonction pop up de confirmation
        function confirmationProduit () {
            if ( window.confirm(`${nom} en couleur ${optionChoice} à bien été ajouter au panier. Cliquez sur OK pour consulter votre panier et ANNULER pour revenir à la page d'accueil.`) )
            {
                window.location.href = "panier.html";
            }
            else { window.location.href = "index.html";}
        }

        })
    }


  