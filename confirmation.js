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
    let idPreview = JSON.parse(localStorage.getItem("idCommande"));
    localStorage.removeItem("idCommande");
    let id = Math.floor(Math.random() * 10000000000000001);

    if(idPreview) {

        if (idPreview.includes(id)) {
        randomID;}
        
        else {
        idPreview.push(id);
        localStorage.setItem("idCommande",JSON.stringify(idPreview));
        
        // Insertion de l'idCommande dans la page
        let positionIdCommande = document.querySelector(".idCommande");
        positionIdCommande.innerHTML = id;

        }
    }

    else {
        idPreview = [];
        idPreview.push(id);
        localStorage.setItem("idCommande",JSON.stringify(idPreview));

        // Insertion de l'idCommande dans la page
        let positionIdCommande = document.querySelector(".idCommande");
        positionIdCommande.innerHTML = id;

    }
};





