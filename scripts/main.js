// Déclarations variables ------------------------------------------------------------------------ 

let products = [];
let totalProducts = [];
let alreadyAddedSearch = [];
let alreadyAddedPending = [];
const searchResultBox = document.getElementById('search-results');
const pendingBox = document.getElementById('pending-food-box');
const resetPendingButton = document.getElementsByClassName('reset-pending')[0];
const resetSearchBarButton = document.getElementsByClassName('reset-search-bar');

let addButton = document.querySelectorAll('.result-product .small-button');

const minusPlusAmount = 50;


// -------------------------------------------------------------------------



async function loadProducts() {
  try {
    const response = await fetch("./scripts/products.json");
    const data = await response.json();
    products = data;
    console.log(products);
  } catch (error) {
    console.error("Impossible d'accéder à la base de donnée :", error);
  }
}

loadProducts();


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


const searchBar = document.getElementById('searchBar');

//TODO : Ajouter une limite d'items ? Ajouter la possibilité d'écrire plusieurs mots ? Vérifier que le mot n'est pas déjà dans la barre

let searchResults = [];


//Fonction recherche
searchBar.addEventListener('input', () => {
    searchResultBox.innerHTML = "";
    products.forEach(product => {
        let matches = false;
        for(let i = 0; i < product.keywords.length; i++) {
            if (product.keywords[i].includes(searchBar.value.toLowerCase()) && !searchResults.includes(product)) {
                matches = true;
            }
        }
        if(matches) {
            searchResults.push(product);
        }
        else if(!matches && searchResults.some(e => e.name === product.name)) {
            const index = searchResults.findIndex(e => e.name === product.name);
            searchResults.splice(index, 1);
        }
        matches = false;
    });

    searchResults.forEach(product => {

        if(!alreadyAddedSearch.includes(product.name)) {
            alreadyAddedSearch.push(product.name);
            placeArticleSearchResult(product.imgUrl, product.imgAlt, product.name, product.kJ, product.kCal, product.proteins, product.carbs)
        }
    })

    searchResults = [];
    alreadyAddedSearch = [];
})


//Fonction ajouter un article au pending
searchResultBox.addEventListener('click', (e) => {
    const target = e.target;
    if(target.matches(".small-button")) {
        const productName = target.getAttribute("data-product-name");
        const index = products.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = products[index];

        const container = target.closest(".result-product");
        const inputBox = container.querySelector(".grams-count");
        let grams = Number(inputBox.value);

        product.grams = grams;
        totalProducts.push(product);
        placeArticlePending(product.imgUrl, product.imgAlt, product.name, product.kJ, product.kCal, product.proteins, product.carbs, product.fat, product.saturatedFat, product.fibers, product.salt, grams)
        totalDisplay(totalProducts);
    }
})

searchResultBox.addEventListener('click', (e) => {
    const target = e.target;

    if(target.matches(".plus-button")) {

        //On récupère la box de l'input
        const container = target.closest(".result-product");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".small-button");
        const productName = smallButton.getAttribute("data-product-name");
        const index = products.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = products[index];

        //On modifie les inputs
        inputBox.value = Number(inputBox.value) + minusPlusAmount;
        grams = Number(inputBox.value);
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        kJText.innerText = (grams/100) * product.kJ + " kJ";
        kCalText.innerText = (grams/100) * product.kCal + " kCal";
        proteinsText.innerText = (grams/100) * product.proteins + " g";
        carbsText.innerText = (grams/100) * product.carbs + " g";


    }

    if(target.matches(".minus-button")) {

        //On récupère la box de l'input
        const container = target.closest(".result-product");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".small-button");
        const productName = smallButton.getAttribute("data-product-name");
        const index = products.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = products[index];

        //On modifie les inputs
        if(Number(inputBox.value) - minusPlusAmount >= 0) {
            inputBox.value = Number(inputBox.value) - minusPlusAmount;
        }
        grams = Number(inputBox.value);
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        kJText.innerText = (grams/100) * product.kJ + " kJ";
        kCalText.innerText = (grams/100) * product.kCal + " kCal";
        proteinsText.innerText = (grams/100) * product.proteins + " g";
        carbsText.innerText = (grams/100) * product.carbs + " g";

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
        const index = products.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = products[index];
        grams = Number(inputBox.value);
        const kJText = container.querySelector(".calories-box").querySelector("p:first-of-type");
        const kCalText = container.querySelector(".calories-box").querySelector("p:nth-of-type(2)");
        const proteinsText = container.querySelector(".proteins-box").querySelector("p");
        const carbsText = container.querySelector(".carbs-box").querySelector("p");
        kJText.innerText = (grams/100) * product.kJ + " kJ";
        kCalText.innerText = (grams/100) * product.kCal + " kCal";
        proteinsText.innerText = (grams/100) * product.proteins + " g";
        carbsText.innerText = (grams/100) * product.carbs + " g";

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
        kJText.innerText = (grams/100) * product.kJ + " kJ";
        kCalText.innerText = (grams/100) * product.kCal + " kCal";
        proteinsText.innerText = (grams/100) * product.proteins + " g";
        carbsText.innerText = (grams/100) * product.carbs + " g";
        fatText.innerText = (grams/100) * product.fat + " g";
        saturatedFatText.innerText = (grams/100) * product.saturatedFat + " g";
        fibersText.innerText = (grams/100) * product.fibers + " g";
        saltText.innerText = (grams/100) * product.salt + " g";
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
        kJText.innerText = (grams/100) * product.kJ + " kJ";
        kCalText.innerText = (grams/100) * product.kCal + " kCal";
        proteinsText.innerText = (grams/100) * product.proteins + " g";
        carbsText.innerText = (grams/100) * product.carbs + " g";
        fatText.innerText = (grams/100) * product.fat + " g";
        saturatedFatText.innerText = (grams/100) * product.saturatedFat + " g";
        fibersText.innerText = (grams/100) * product.fibers + " g";
        saltText.innerText = (grams/100) * product.salt + " g";
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
        kJText.innerText = Number.parseFloat((grams/100) * product.kJ).toFixed(2) + " kJ";
        kCalText.innerText = Number.parseFloat((grams/100) * product.kCal).toFixed(2) + " kCal";
        proteinsText.innerText = Number.parseFloat((grams/100) * product.proteins).toFixed(2) + " g";
        carbsText.innerText = Number.parseFloat((grams/100) * product.carbs).toFixed(2) + " g";
        fatText.innerText = Number.parseFloat((grams/100) * product.fat).toFixed(2) + " g";
        saturatedFatText.innerText = Number.parseFloat((grams/100) * product.saturatedFat).toFixed(2) + " g";
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

resetSearchBarButton.addEventListener('click', () => {

})


placeArticleSearchResult(products[0].imgUrl, products[0].imgAlt, products[0].name, products[0].kJ, products[0].kCal, products[0].proteins, products[0].carbs);




login_button.addEventListener('click', (e) => {
    console.log('test');
    login_button.style.display = flex;
})