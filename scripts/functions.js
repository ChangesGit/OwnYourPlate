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

function roundClean(number, decimals = 2) {
    return parseFloat(number.toFixed(decimals));
}