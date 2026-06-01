let products = [];

let alreadyAddedSearch = [];
let alreadyAddedPending = [];
const searchResultBox = document.getElementById('search-results');

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

let imgURL = "./assets/images/skyr-1.png"
let imgAlt = "image test"
let articleName = "test";
let articleKJ = "test";
let articleKCal = "test"
let articleProteins = "test";
let articleCarbs = "test";

// placeArticleSearchResult(imgURL, imgAlt, articleName, articleKJ, articleKCal, articleProteins, articleCarbs);
placeArticlePending(imgURL, imgAlt, articleName, articleKJ, articleKCal, articleProteins, articleCarbs)


const searchBar = document.getElementById('searchBar');

//TODO : Ajouter une limite d'items ? Ajouter la possibilité d'écrire plusieurs mots ? Vérifier que le mot n'est pas déjà dans la barre

let searchResults = [];

searchBar.addEventListener('input', () => {
    searchResultBox.innerHTML = "";
    console.log(searchBar.value)

    products.forEach(product => {
        let matches = false;
        for(let i = 0; i < product.keywords.length; i++) {
            if (product.keywords[i].includes(searchBar.value) && !searchResults.includes(product)) {
                matches = true;
            }
            // if(!product.keywords[i].includes(searchBar.value) && searchResults.some(e => e.name === product.name)) {
            //     const index = searchResults.findIndex(e => e.name === product.name);
            //     searchResults.splice(index,1);
            // }
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

