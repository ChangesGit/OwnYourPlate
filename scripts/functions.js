function placeArticleSearchResult(imgURL, imgAlt, name, kJ, kCal, proteins, carbs) {
    const searchResultBox = document.getElementById('search-results');
    const resultArticleTemplate = `<article class = "result-product"> <!--Produit-->
                <div class = "name-img-flex">
                    <img src=${imgURL} alt=${imgAlt}>
                    <h3>${name}</h3>
                    <div class = "number-buttons-box">
                        <button class = "amount-button minus-button" data-product-name = "${name}">-</button> <!--Signe moins-->
                        <div class = "number-box soft-border">
                            <input class = "grams-count" type = "number" min = "0" value = "100"></input>
                            <span>g</span>
                        </div>
                        <button class = "amount-button plus-button" data-product-name = "${name}">+</button> <!--Signe plus-->
                    </div>
                </div>
                <div class = "result-nutri">
                    <div class = "text-number">
                        <p>Calories : </p>
                        <div class = "number-box soft-border calories-box">
                            <p>${kJ} kJ</p>
                            <p>${kCal} kCal</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Protéines : </p>
                        <div class = "number-box soft-border proteins-box">
                            <p>${proteins} g</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Glucides : </p>
                        <div class = "number-box soft-border carbs-box">
                            <p>${carbs} g</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>...</p>
                    <div>
                        <button class = "small-button soft-border soft-shadow" data-product-name = "${name}">Ajouter</button>
                    </div>
                </div>
                <hr class = "box-bar">
            </article>`

    searchResultBox.insertAdjacentHTML("beforeend", resultArticleTemplate);
}

function placeArticlePending(imgUrl, name, kJ, kCal, proteins, carbs, fat, saturatedFat, fibers, salt, grams) { //TODO : Rajouter une variable "quantité"
    const pendingBox = document.getElementById('pending-food-box');    
    const pendingArticleTemplate = `<article class = "pending-food-item" data-product-name = "${name}"> <!--Aliment-->
                    <div class = "name-img-flex">
                        <img src=${imgUrl} alt="image de ${name}">
                        <h3>${name}</h3>
                    </div>
                    <div class = "text-button-flex">
                        <p>Quantité (g) : </p>
                        <div>
                            <button class = "amount-button minus-button" data-product-name = "${name}">-</button> <!--Signe moins-->
                            <div class = "number-box soft-border">
                                <input class = "grams-count" type = "number" min = "0" value = "${grams}"></input>
                                <span>g</span>
                            </div>
                            <button class = "amount-button plus-button" data-product-name = "${name}">+</button> <!--Signe plus-->
                        </div>
                            <button class = "amount-button delete-pending" data-product-name = "${name}">X</button> <!--Bouton supprimer-->
                    </div>
                    <div class = "item-infos-grid"> <!--Grid de toutes les informations nutritionnelles-->
                        <div class = "item-infos-grid-element">
                            <p>Calories</p>
                            <div class = "number-box soft-border calories-box">
                                <p>${kJ} kJ</p>
                                <p>${kCal} kCal</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element">
                            <p>Protéines</p>
                            <div class = "number-box soft-border proteins-box">
                                <p>${proteins} g</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element">
                            <p>Glucides</p>
                            <div class = "number-box soft-border carbs-box">
                                <p>${carbs} g</p>
                            </div>
                        </div>
                        <div>
                            <div class = "item-infos-grid-element">
                                <p class = "overflow-text">Matières grasses</p>
                                <div class = "number-box soft-border fat-box">
                                    <p>${fat} g</p>
                                </div>
                            </div>
                            <div class = "item-infos-grid-element mobile-hidden-flex">
                                <p class = "overflow-text">Dont Acides Gras Saturés</p>
                                <div class = "number-box soft-border saturated-fat-box">
                                    <p>${saturatedFat} g</p>
                                </div>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element mobile-hidden-flex">
                            <p>Fibres</p>
                            <div class = "number-box soft-border fibers-box">
                                <p>${fibers} g</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element mobile-hidden-flex">
                            <p>Sel</p>
                            <div class = "number-box soft-border salt-box">
                                <p>${salt} g</p>
                            </div>
                        </div>
                    </div>
                    <hr class = "box-bar">
                </article>`
                
    if(!pendingBox.innerHTML.includes(pendingArticleTemplate)) {
        pendingBox.children[1].insertAdjacentHTML("afterend", pendingArticleTemplate);
    }
}

function placeRecipe(name, grams, kj, kcal, createdAt, updatedAt, recipeId, imgurl = './assets/images/default-recipe-image.jpg') {
    const recipesBox = document.getElementById('recipes-box');
    const recipeTemplate = `<article class = "recipe"> <!--Une recette-->
                <div class = "name-img-flex">
                    <img src=${imgurl} alt="Image d'un produit">
                    <h3>${name}</h3>
                </div>
                <div class = "text-number">
                    <p>Poids total : </p>
                    <div class = "number-box soft-border">
                        <p>${grams} g</p>
                    </div>
                </div>
                <div class = "text-number">
                    <p>Calories : </p>
                    <div class = "number-box soft-border">
                        <p>${kj} kJ</p>
                        <p>${kcal} kCal</p>
                    </div>
                </div>
                <div class = "text-number">
                    <p>Ajoutée le :  </p>
                    <div class = "date-box soft-border">
                        <p>${createdAt}</p>
                    </div>
                </div>
                <div class = "text-number">
                    <p>Dernières modifications : </p>
                    <div class = "date-box soft-border">
                        <p>${updatedAt}</p>
                    </div>
                </div>
                <div>
                    <form action="./recipe_details.php" method = "GET">
                        <input type="hidden" name="id" value="${recipeId}">
                        <input type="hidden" name="name" value="${name}">
                        <button class = "small-button soft-border soft-shadow">Voir détails</button>
                    </form>
                </div>
                <hr class = "box-bar">
            </article>`;

    recipesBox.insertAdjacentHTML("beforeend", recipeTemplate);


}

function placeIngredientDetails(name, imgurl,grams, kj, kcal, proteins, carbs, fat, saturatedFat, fibers, salt) {
    const recipeDetailsBox = document.getElementById('recipe-box');
    const recipeIngredientTemplate = `<article class = "pending-food-item" data-product-name = "${name}"> <!--Aliment-->
                <div class = "name-img-flex">
                    <img src=${imgurl} alt="image de ${name}">
                    <h3>${name}</h3>
                </div>
                <div class = "text-button-flex">
                    <p>Quantité (g) : </p>
                    <div>
                        <button class = "amount-button minus-button" data-product-name = "${name}">-</button> <!--Signe moins-->
                        <div class = "number-box soft-border">
                            <input class = "grams-count" type = "number" min = "0" value = "${grams}"></input>
                            <span>g</span>
                        </div>
                        <button class = "amount-button plus-button" data-product-name = "${name}">+</button> <!--Signe plus-->
                    </div>
                        <button class = "amount-button delete-pending" data-product-name = "${name}">X</button> <!--Bouton supprimer-->
                        <dialog id = "delete-confirmation-modal">
                            <p>Êtes-vous sûr de vouloir enregistrer les modifications ?</p>
                            <button id = "delete-confirmation-button">Je confirme</button>
                        </dialog>
                </div>
                <div class = "item-infos-grid"> <!--Grid de toutes les informations nutritionnelles-->
                    <div class = "item-infos-grid-element">
                        <p>Calories</p>
                        <div class = "number-box soft-border calories-box">
                            <p>${kj} kJ</p>
                            <p>${kcal} kCal</p>
                        </div>
                    </div>
                    <div class = "item-infos-grid-element">
                        <p>Protéines</p>
                        <div class = "number-box soft-border proteins-box">
                            <p>${proteins} g</p>
                        </div>
                    </div>
                    <div class = "item-infos-grid-element">
                        <p>Glucides</p>
                        <div class = "number-box soft-border carbs-box">
                            <p>${carbs} g</p>
                        </div>
                    </div>
                    <div>
                        <div class = "item-infos-grid-element">
                            <p class = "overflow-text">Matières grasses</p>
                            <div class = "number-box soft-border fat-box">
                                <p>${fat} g</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element mobile-hidden-flex">
                            <p class = "overflow-text">Dont Acides Gras Saturés</p>
                            <div class = "number-box soft-border saturated-fat-box">
                                <p>${saturatedFat} g</p>
                            </div>
                        </div>
                    </div>
                    <div class = "item-infos-grid-element mobile-hidden-flex">
                        <p>Fibres</p>
                        <div class = "number-box soft-border fibers-box">
                            <p>${fibers} g</p>
                        </div>
                    </div>
                    <div class = "item-infos-grid-element mobile-hidden-flex">
                        <p>Sel</p>
                        <div class = "number-box soft-border salt-box">
                            <p>${salt} g</p>
                        </div>
                    </div>
                </div>
                <button class="small-button soft-shadow soft-border">Voir</button>
                <hr class = "box-bar">
            </article>`
    recipeDetailsBox.insertAdjacentHTML("afterbegin", recipeIngredientTemplate);

}

function totalDisplay(products) {
    const hTotalGrams = document.getElementById('total-mass');
    const hTotalKJ = document.getElementById('total-kj');
    const hTotalKCal = document.getElementById('total-kcal');
    const hTotalProteins = document.getElementById('total-proteins');
    const hTotalCarbs = document.getElementById('total-carbs');
    const hTotalFibers = document.getElementById('total-fibers');
    const hTotalFat = document.getElementById('total-fat');
    const hTotalSaturatedFat = document.getElementById('total-saturated-fat');
    const hTotalSalt = document.getElementById('total-salt');
    let totalGrams = 0;
    let totalKJ = 0;
    let totalKCal = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFibers = 0;
    let totalFat = 0;
    let totalSaturatedFat = 0;
    let totalSalt = 0;
    products.forEach(product => {
        totalGrams += product.grams;
        totalKJ += product.kj * (product.grams/100);
        totalKCal += product.kcal * (product.grams/100);
        totalProteins += product.proteins * (product.grams/100);
        totalCarbs += product.carbs * (product.grams/100);
        totalFibers += product.fibers * (product.grams/100);
        totalFat += product.fat * (product.grams/100);
        totalSaturatedFat += product.saturated_fat * (product.grams/100);
        totalSalt += roundClean(product.salt * (product.grams/100));
    });

    hTotalGrams.innerText = roundClean(totalGrams) + "g";
    hTotalKJ.innerText = roundClean(totalKJ) + "kJ";
    hTotalKCal.innerText = roundClean(totalKCal) + "kCal";
    hTotalProteins.innerText = roundClean(totalProteins) + "g";
    hTotalCarbs.innerText = roundClean(totalCarbs) + "g";
    hTotalFibers.innerText = roundClean(totalFibers) + "g";
    hTotalFat.innerText = roundClean(totalFat) + "g";
    hTotalSaturatedFat.innerText = roundClean(totalSaturatedFat) + "g";
    hTotalSalt.innerText = roundClean(totalSalt) + "g";
    console.log(totalKJ, totalProteins, totalCarbs);
}

async function searchFunction(searchBar){
    const userInput = searchBar.value.toLowerCase();
    const response = await fetch('./search.php?q='+encodeURIComponent(userInput));
    const results = await response.json();
    return results;
}

async function createRecipe(products) {
    const response = await fetch('./recipe_create.php', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(products)
    });
}

async function updateRecipe(products) {
    const response = await fetch('./recipe_update.php', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(products)
    });
}

function roundClean(number, decimals = 2) {
    return parseFloat(number.toFixed(decimals));
}


//Place les recettes sur la page recipes.php
async function recipesPageStartUp() {

    const response = await fetch('./recipes_read.php');
    const recipes = await response.json();
    console.log(recipes);
    let name = '';
    let grams = 0;
    let kj = 0;
    let kcal = 0;
    let createdAt = '';
    let updatedAt = '';
    let recipe_id = 0;

    recipes.forEach((recipe, index) => {
        if(recipe['recipe_id'] == recipe_id) {
            
            name = recipe['recipe_name'];
            grams += recipe['quantity'];
            kj += recipe['kj'] * (grams/100);
            kcal += recipe['kcal'] * (grams/100);
            createdAt = recipe['created_at'];
            updatedAt = recipe['updated_at'];
            console.log(index);
            if (index === (recipes.length - 1)) {
                console.log(index);
                placeRecipe(name, grams, kj, kcal, createdAt, updatedAt, recipe_id);
            }
        }
        else {
            if(recipe_id !=0) {
                placeRecipe(name, grams, kj, kcal, createdAt, updatedAt, recipe_id);
                
            }
            const recipe_save = recipe_id;
            recipe_id = recipe['recipe_id'];
            name = recipe['recipe_name'];
            grams = recipe['quantity'];
            kj = recipe['kj'] * (grams/100);
            kcal = recipe['kcal'] * (grams/100);
            createdAt = recipe['created_at'];
            updatedAt = recipe['updated_at'];

            //Si il y a une seule recette on ne repasse pas dans la boucle et on l'affiche donc
            if(recipes.length == 1) {
                console.log("test")
                placeRecipe(name, grams, kj, kcal, createdAt, updatedAt, recipe_id);
            }
        }

    }); 
}


async function recipeDetailsStartUp() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    const response = await fetch('./recipe_details_read.php?id=' + recipeId);
    recipeIngredients = await response.json();
    recipeIngredientsUntouched = structuredClone(recipeIngredients);

    console.log(recipeIngredients);
    recipeDetailsPlacer(recipeIngredients);
    }


function recipeDetailsPlacer(recipeIngredients) {
        recipeIngredients.forEach((ingredient) => {
            const name = ingredient.name;
            const imgurl= ingredient.imgurl;
            const grams = ingredient.quantity;
            const kj = ingredient.kj;
            const kcal = ingredient.kcal;
            const proteins = ingredient.proteins;
            const carbs = ingredient.carbs;
            const fat = ingredient.fat;
            const saturatedFat = ingredient.saturated_fat;
            const fibers = ingredient.fibers;
            const salt = ingredient.salt;
            placeIngredientDetails(name, imgurl,grams, kj, kcal, proteins, carbs, fat, saturatedFat, fibers, salt);
    })
}

function resetRecipeDetails() {
    const recipeBox = document.getElementById('recipe-box');
    recipeBox.innerHTML = "";
    recipeBox.innerHTML = `<button id = "cancel-recipe-details" class="large-button soft-shadow soft-border">Annuler modifications</button>
            <dialog id = "cancel-confirmation-modal">
                <p>Êtes-vous sûr de vouloir annuler les modifications ?</p>
                <button id = "cancel-confirmation-button">Je confirme</button>
            </dialog>
            <button id = "save-recipe-details" class="large-button soft-shadow soft-border">Enregistrer modifications</button>
            <dialog id = "save-confirmation-modal">
                <p>Êtes-vous sûr de vouloir enregistrer les modifications ?</p>
                <button id = "save-confirmation-button">Je confirme</button>
            </dialog>
        </section>`;
    console.log('réussite')
    
}

function deleteRecipeIngredient() {

}