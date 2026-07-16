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

        const product = results[index];

        const container = target.closest(".result-product");
        const inputBox = container.querySelector(".grams-count");
        let grams = Number(inputBox.value);

        product.grams = grams;
        totalProducts.push(product);
        placeArticlePending(product.imgurl, product.name, product.kj, product.kcal, product.proteins, product.carbs, product.fat, product.saturated_fat, product.fibers, product.salt, grams)
        totalDisplay(totalProducts);
    }
})


//Bouton + et -
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
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        kJText.innerText = roundClean((grams/100) * product.kj) + " kJ";
        kCalText.innerText = roundClean((grams/100) * product.kcal) + " kCal";
        proteinsText.innerText = roundClean((grams/100) * product.proteins) + " g";
        carbsText.innerText = roundClean((grams/100) * product.carbs) + " g";


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
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        kJText.innerText = roundClean((grams/100) * product.kj) + " kJ";
        kCalText.innerText = roundClean((grams/100) * product.kcal) + " kCal";
        proteinsText.innerText = roundClean((grams/100) * product.proteins) + " g";
        carbsText.innerText = roundClean((grams/100) * product.carbs) + " g";

    }
})


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
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        kJText.innerText = roundClean((grams/100) * product.kj) + " kJ";
        kCalText.innerText = roundClean((grams/100) * product.kcal) + " kCal";
        proteinsText.innerText = roundClean((grams/100) * product.proteins) + " g";
        carbsText.innerText = roundClean((grams/100) * product.carbs) + " g";

    }
})


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
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        const fatText = container.querySelector(".fat-box").querySelector("p");
        const saturatedFatText = container.querySelector(".saturated-fat-box").querySelector("p");
        const fibersText = container.querySelector(".fibers-box").querySelector("p");
        const saltText = container.querySelector(".salt-box").querySelector("p");
        kJText.innerText = roundClean((grams/100) * product.kj) + " kJ";
        kCalText.innerText = roundClean((grams/100) * product.kcal) + " kCal";
        proteinsText.innerText = roundClean((grams/100) * product.proteins) + " g";
        carbsText.innerText = roundClean((grams/100) * product.carbs) + " g";
        fatText.innerText = roundClean((grams/100) * product.fat) + " g";
        saturatedFatText.innerText = roundClean((grams/100) * product.saturated_fat) + " g";
        fibersText.innerText = roundClean((grams/100) * product.fibers) + " g";
        saltText.innerText = roundClean((grams/100) * product.salt) + " g";
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
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        const fatText = container.querySelector(".fat-box").querySelector("p");
        const saturatedFatText = container.querySelector(".saturated-fat-box").querySelector("p");
        const fibersText = container.querySelector(".fibers-box").querySelector("p");
        const saltText = container.querySelector(".salt-box").querySelector("p");
        kJText.innerText = roundClean((grams/100) * product.kj) + " kJ";
        kCalText.innerText = roundClean((grams/100) * product.kcal) + " kCal";
        proteinsText.innerText = roundClean((grams/100) * product.proteins) + " g";
        carbsText.innerText = roundClean((grams/100) * product.carbs) + " g";
        fatText.innerText = roundClean((grams/100) * product.fat) + " g";
        saturatedFatText.innerText = roundClean((grams/100) * product.saturated_fat) + " g";
        fibersText.innerText = roundClean((grams/100) * product.fibers) + " g";
        saltText.innerText = roundClean((grams/100) * product.salt) + " g";
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
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        const fatText = container.querySelector(".fat-box").querySelector("p");
        const saturatedFatText = container.querySelector(".saturated-fat-box").querySelector("p");
        const fibersText = container.querySelector(".fibers-box").querySelector("p");
        const saltText = container.querySelector(".salt-box").querySelector("p");
        kJText.innerText = Number.parseFloat((grams/100) * product.kj).toFixed(2) + " kJ";
        kCalText.innerText = Number.parseFloat((grams/100) * product.kcal).toFixed(2) + " kCal";
        proteinsText.innerText = Number.parseFloat((grams/100) * product.proteins).toFixed(2) + " g";
        carbsText.innerText = Number.parseFloat((grams/100) * product.carbs).toFixed(2) + " g";
        fatText.innerText = Number.parseFloat((grams/100) * product.fat).toFixed(2) + " g";
        saturatedFatText.innerText = Number.parseFloat((grams/100) * product.saturated_fat).toFixed(2) + " g";
        fibersText.innerText = Number.parseFloat((grams/100) * product.fibers).toFixed(2) + " g";
        saltText.innerText = Number.parseFloat((grams/100) * product.salt).toFixed(2) + " g";
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