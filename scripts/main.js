let products = [];

let totalProducts = [];

let alreadyAddedSearch = [];
let alreadyAddedPending = [];
const searchResultBox = document.getElementById('search-results');

let addButton = document.querySelectorAll('.result-product .small-button');



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

searchBar.addEventListener('input', () => {
    searchResultBox.innerHTML = "";
    products.forEach(product => {
        let matches = false;
        for(let i = 0; i < product.keywords.length; i++) {
            if (product.keywords[i].includes(searchBar.value) && !searchResults.includes(product)) {
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


searchResultBox.addEventListener('click', (e) => {
    let target = e.target;
    if(target.matches(".small-button")) {
        let productName = target.getAttribute("data-product-name");
        let index = products.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        let product = products[index];
        totalProducts.push(product);
        placeArticlePending(product.imgUrl, product.imgAlt, product.name, product.kJ, product.kCal, product.proteins, product.carbs, product.fat, product.saturatedFat, product.fibers, product.salt)
        totalDisplay(totalProducts);
    }
})
