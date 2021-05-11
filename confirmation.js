afficherLeTotal();
afficherIdCommande();



// TOTAL
function afficherLeTotal () {
// Connexion au localstorage pour récupérer le montant de la commande !
let total = JSON.parse(localStorage.getItem("total"));

// Insertion du total dans la page
let positionTotal = document.querySelector(".totalCommande");
positionTotal.innerHTML = total[0];
};


// ID COMMANDE




function afficherIdCommande(){
    // On récuper le dernier id et on réinitialise le stockage
    let Id = JSON.parse(localStorage.getItem("idCommande"));
    localStorage.removeItem("idCommande");
    
    // Insertion de l'idCommande dans la page
    let positionIdCommande = document.querySelector(".idCommande");
    positionIdCommande.innerHTML = Id;

    
};





