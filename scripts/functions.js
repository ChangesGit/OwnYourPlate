

function placeArticleSearchResult(imgURL, imgAlt, name, kJ, kCal, proteins, carbs) {
    const searchResultBox = document.getElementById('search-results');
    let resultArticleTemplate = `<article class = "result-product"> <!--Produit-->
                <div class = "name-img-flex">
                    <img src=${imgURL} alt=${imgAlt}>
                    <h3>${name}</h3>
                </div>
                <div class = "result-nutri">
                    <div class = "text-number">
                        <p>Calories/100g : </p>
                        <div class = "number-box soft-border">
                            <p>${kJ} kJ</p>
                            <p>${kCal} kCal</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Protéines/100g : </p>
                        <div class = "number-box soft-border">
                            <p>${proteins} g</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Glucides/100g : </p>
                        <div class = "number-box soft-border">
                            <p>${carbs} g</p>
                        </div>
                    </div>
                </div>
                    <div>
                    <p>...</p>
                    <div>
                        <button class = "small-button soft-border soft-shadow" data-product-name = "${name}">Ajouter</button>
                        <div>
                            <button class = "amount-button" data-product-name = "${name}">-</button> <!--Signe moins-->
                            <div class = "number-box soft-border">
                                <p>100 g</p>
                            </div>
                            <button class = "amount-button" data-product-name = "${name}">+</button> <!--Signe plus-->
                        </div>

                    </div>
                </div>
                <hr class = "box-bar">
            </article>`

    searchResultBox.insertAdjacentHTML("afterbegin", resultArticleTemplate);
}

function placeArticlePending(imgUrl, imgAlt, name, kJ, kCal, proteins, carbs, fat, saturatedFat, fibers, salt) { //TODO : Rajouter une variable "quantité"
    const pendingBox = document.getElementById('pending-food-box');    
    let pendingArticleTemplate = `<article class = "pending-food-item" data-product-name = "${name}"> <!--Aliment-->
                    <div class = "name-img-flex">
                        <img src=${imgUrl} alt="${imgAlt}">
                        <h3>${name}</h3>
                    </div>
                    <div class = "text-button-flex">
                        <p>Quantité (g) : </p>
                        <div>
                            <button class = "amount-button" data-product-name = "${name}">-</button> <!--Signe moins-->
                            <div class = "number-box soft-border">
                                <p>100 g</p>
                            </div>
                            <button class = "amount-button" data-product-name = "${name}">+</button> <!--Signe plus-->
                        </div>
                            <button class = "amount-button delete-pending" data-product-name = "${name}">X</button> <!--Bouton supprimer-->
                    </div>
                    <div class = "item-infos-grid"> <!--Grid de toutes les informations nutritionnelles-->
                        <div class = "item-infos-grid-element">
                            <p>Calories</p>
                            <div class = "number-box soft-border">
                                <p>${kJ} kJ</p>
                                <p>${kCal} kCal</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element">
                            <p>Protéines</p>
                            <div class = "number-box soft-border">
                                <p>${proteins} g</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element">
                            <p>Glucides</p>
                            <div class = "number-box soft-border">
                                <p>${carbs} g</p>
                            </div>
                        </div>
                        <div>
                            <div class = "item-infos-grid-element">
                                <p>Matières grasses</p>
                                <div class = "number-box soft-border">
                                    <p>${fat} g</p>
                                </div>
                            </div>
                            <div class = "item-infos-grid-element mobile-hidden-flex">
                                <p>Dont Acides Gras Saturés</p>
                                <div class = "number-box soft-border">
                                    <p>${saturatedFat} g</p>
                                </div>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element mobile-hidden-flex">
                            <p>Fibres</p>
                            <div class = "number-box soft-border">
                                <p>${fibers} g</p>
                            </div>
                        </div>
                        <div class = "item-infos-grid-element mobile-hidden-flex">
                            <p>Sel</p>
                            <div class = "number-box soft-border">
                                <p>${salt} g</p>
                            </div>
                        </div>
                    </div>
                    <hr class = "box-bar">
                </article>`
                
    if(!pendingBox.innerHTML.includes(pendingArticleTemplate)) {
        pendingBox.insertAdjacentHTML("afterbegin", pendingArticleTemplate);
    }
}


function totalDisplay(products) {
    const hTotalMass = document.getElementById('total-mass');
    const hTotalKJ = document.getElementById('total-kj');
    const hTotalKCal = document.getElementById('total-kcal');
    const hTotalProteins = document.getElementById('total-proteins');
    const hTotalCarbs = document.getElementById('total-carbs');
    const hTotalFibers = document.getElementById('total-fibers');
    const hTotalFat = document.getElementById('total-fat');
    const hTotalSaturatedFat = document.getElementById('total-saturated-fat');
    const hTotalSalt = document.getElementById('total-salt');
    let totalMass = 0;
    let totalKJ = 0;
    let totalKCal = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFibers = 0;
    let totalFat = 0;
    let totalSaturatedFat = 0;
    let totalSalt = 0;
    products.forEach(product => {
        totalKJ += product.kJ;
        totalKCal += product.kCal;
        totalProteins += product.proteins;
        totalCarbs += product.carbs;
        totalFibers += product.fibers
        totalFat += product.fat;
        totalSaturatedFat += product.saturatedFat;
        totalSalt += product.salt;
    });

    hTotalMass.innerText = totalMass + "g";
    hTotalKJ.innerText = totalKJ + "kJ";
    hTotalKCal.innerText = totalKCal + "kCal";
    hTotalProteins.innerText = totalProteins + "g";
    hTotalCarbs.innerText = totalCarbs + "g";
    hTotalFibers.innerText = totalFibers + "g";
    hTotalFat.innerText = totalFat + "g";
    hTotalSaturatedFat.innerText = totalSaturatedFat + "g";
    hTotalSalt.innerText = totalSalt + "g";
    console.log(totalKJ, totalProteins, totalCarbs);
}