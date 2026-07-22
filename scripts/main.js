// Déclarations variables ------------------------------------------------------------------------ 

let results = [];
let totalProducts = [];
let alreadyAddedSearch = [];
let alreadyAddedPending = [];
const searchResultBox = document.getElementById('search-results');
const pendingBox = document.getElementById('pending-food-box');
const resetPendingButton = document.getElementsByClassName('reset-pending')[0];
const resetSearchBarButton = document.getElementsByClassName('reset-search-bar');
const createRecipeButton = document.getElementById('create-recipe-button');


let addButton = document.querySelectorAll('.result-product .small-button');

const minusPlusAmount = 50;


// -------------------------------------------------------------------------


// On affiche les 10 premiers résultats de la BDD en initialisation
(async () => {
    const searchBar = document.getElementById('searchBar');
    results = await searchFunction(searchBar);
    results.forEach(product => {
    placeArticleSearchResult(product['imgurl'], '', product['name'], product['kj'], product['kcal'], product['proteins'], product['carbs']);
});
})();



// ------------------------------------------------------------------------



const burgerMenu = document.querySelector('#burger-menu nav');
const burgerMenuButton = document.getElementById('menu-toggle');

burgerMenuButton.addEventListener('click', () => {
    if(burgerMenu.style.display === 'none') {
        burgerMenu.style.display = 'block';
    }
    else {
        burgerMenu.style.display = 'none';
    }

})



//TODO : Ajouter la possibilité d'écrire plusieurs mots ? Vérifier que le mot n'est pas déjà dans la barre

//Initialisation Fonction Recherche
let searchResults = [];
let debounceTimer;


//TODO : Ajouter un AbortController
//Fonction recherche
searchBar.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        while(searchResultBox.childElementCount>2) {
            searchResultBox.removeChild(searchResultBox.lastChild);
        }
        results = await searchFunction(e.target);
        console.log(results);
        results.forEach(product => {
            placeArticleSearchResult(product['imgurl'], '', product['name'], product['kj'], product['kcal'], product['proteins'], product['carbs']);
        });
    }, 300)
    
})


//Fonction ajouter un article au pending
searchResultBox.addEventListener('click', (e) => {
    const target = e.target;
    if(target.matches(".small-button")) {
        const productName = target.getAttribute("data-product-name");
        const index = results.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());

        //AJOUTER UN IF POUR PAS AJOUTER DEUX FOIS UN PRODUIT
        const product = results[index];

        //On vérifie que le produit n'est pas déjà dans le pending pour éviter les doublons
        const alreadyExistVerif = totalProducts.findIndex(e => e.product_id === product.product_id);
        console.log(alreadyExistVerif)
        if(alreadyExistVerif === -1) {
            const container = target.closest(".result-product");
            const inputBox = container.querySelector(".grams-count");
            let grams = Number(inputBox.value);
            product.grams = grams;

            totalProducts.push({ ...product});

            placeArticlePending(product.imgurl, product.name, roundClean((grams/100) * product.kj), roundClean((grams/100) * product.kcal), roundClean((grams/100) * product.proteins), roundClean((grams/100) * product.carbs), roundClean((grams/100) * product.fat), roundClean((grams/100) * product.saturated_fat), roundClean((grams/100) * product.fibers), roundClean((grams/100) * product.salt), grams, product.product_id)
        }
        else {
            const container = target.closest(".result-product");
            const inputBox = container.querySelector(".grams-count");
            let grams = Number(inputBox.value);
            product.grams = grams;
            totalProducts[alreadyExistVerif].grams += grams;
            
            updateArticlePending(totalProducts[alreadyExistVerif]);
        }

        totalDisplay(totalProducts);
    }
})


//Bouton + et - résultats de recherche
searchResultBox.addEventListener('click', (e) => {
    const target = e.target;

    if(target.matches(".plus-button")) {

        //On récupère la box de l'input
        const container = target.closest(".result-product");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".small-button");
        const productName = smallButton.getAttribute("data-product-name");
        const index = results.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = results[index];

        //On modifie les inputs
        inputBox.value = Number(inputBox.value) + minusPlusAmount;
        grams = Number(inputBox.value);
        updateNutriValues(container, product, grams, "short");
    }

    if(target.matches(".minus-button")) {

        //On récupère la box de l'input
        const container = target.closest(".result-product");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".small-button");
        const productName = smallButton.getAttribute("data-product-name");
        const index = results.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = results[index];

        //On modifie les inputs
        if(Number(inputBox.value) - minusPlusAmount >= 0) {
            inputBox.value = Number(inputBox.value) - minusPlusAmount;
        }
        grams = Number(inputBox.value);
        updateNutriValues(container, product, grams, "short");

    }
})


//Input d'un aliment des résultats de recherche
searchResultBox.addEventListener('input', (e) => {
    console.log(e.target);
    if(e.target.matches(".grams-count")) {
        console.log(e.target);
        const inputBox = e.target;
        const container = inputBox.closest(".result-product");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".small-button");
        const productName = smallButton.getAttribute("data-product-name");
        const index = results.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = results[index];
        grams = Number(inputBox.value);
        updateNutriValues(container, product, grams, "short");
    }
})


//Input d'un aliment de la pending box 
pendingBox.addEventListener('input', (e) => {
    console.log(e.target);
    if(e.target.matches(".grams-count")) {
        console.log(e.target);
        const inputBox = e.target;
        const container = inputBox.closest(".pending-food-item");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".delete-pending");
        const productName = smallButton.getAttribute("data-product-name");
        const index = totalProducts.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = totalProducts[index];
        grams = Number(inputBox.value);
        totalProducts[index].grams = grams;
        updateNutriValues(container, product, grams, "extended");
        totalDisplay(totalProducts);
    }
})



//Fonction supprimer un article de pending
pendingBox.addEventListener('click', (e) => { //We delete the element first from totalProducts, then from the DOM, then we display a new total
    const target = e.target;
    if(target.matches(".delete-pending")) {
        const productName = target.getAttribute("data-product-name");
        const index = totalProducts.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        totalProducts.splice(index, 1);
        const productToDelete = document.querySelector(`#pending-food-box article[data-product-name = ${productName}]`)
        productToDelete.remove();
        totalDisplay(totalProducts);
    }
})


//Boutons + et - article du pending
pendingBox.addEventListener('click', (e) => {
    const target = e.target;
    if(target.matches(".plus-button")) {
        const container = target.closest(".pending-food-item");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".delete-pending");
        const productName = smallButton.getAttribute("data-product-name");
        const index = totalProducts.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = totalProducts[index];

        console.log(product);
        //On modifie les inputs
        inputBox.value = Number(inputBox.value) + minusPlusAmount;
        grams = Number(inputBox.value);
        totalProducts[index].grams = grams;
        updateNutriValues(container, product, grams, "extended");
        totalDisplay(totalProducts);
    }
    if(target.matches(".minus-button")) {
        const container = target.closest(".pending-food-item");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".delete-pending");
        const productName = smallButton.getAttribute("data-product-name");
        const index = totalProducts.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = totalProducts[index];

        console.log(product);

        //On modifie les inputs
        if(Number(inputBox.value) - minusPlusAmount >= 0) {
            inputBox.value = Number(inputBox.value) - minusPlusAmount;
        }
        
        grams = Number(inputBox.value);
        totalProducts[index].grams = grams;
        updateNutriValues(container, product, grams, "extended");
        totalDisplay(totalProducts);
    }
})



resetPendingButton.addEventListener('click', () => { //Reset the pending box and actualise the total
    totalProducts = [];
    const toDelete = document.querySelectorAll('#pending-food-box article');
    toDelete.forEach(product => product.remove());
    totalDisplay(totalProducts);
})

const createRecipeForm = document.getElementById('create-recipe-form');

createRecipeButton.addEventListener('click', (e) => {
    createRecipeForm.showModal();
})

const closeButtonRecipeForm = document.querySelector('#create-recipe-form > button:first-of-type');

closeButtonRecipeForm.addEventListener('click', (e) => {
    createRecipeForm.close();
})

const sendRecipeForm = document.getElementById('send-recipe-button');
const inputRecipe = document.getElementById('recipe-name');

sendRecipeForm.addEventListener('click', (e) => {
    const name = inputRecipe.value;
    if(name !== '') {
        const sendProducts = [totalProducts, name];
        createRecipe(sendProducts);
    }
    createRecipeForm.close();
    inputRecipe.value = '';
})