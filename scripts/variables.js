let resultArticleTemplateSave = `<article class = "result-product"> <!--Produit-->
                <div class = "name-img-flex">
                    <img src="./assets/images/skyr-1.png" alt="Image d'un produit">
                    <h3>Skyr Nature 0% - Yoplait - 850g</h3>
                </div>
                <div class = "result-nutri">
                    <div class = "text-number">
                        <p>Calories/100g : </p>
                        <div class = "number-box soft-border">
                            <p>226 kJ</p>
                            <p>57 kCal</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Protéines/100g : </p>
                        <div class = "number-box soft-border">
                            <p>9.5g</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Glucides/100g : </p>
                        <div class = "number-box soft-border">
                            <p>3.6g</p>
                        </div>
                    </div>
                </div>
                    <div>
                    <p>...</p>
                    <button class = "small-button soft-border soft-shadow">Ajouter</button>
                </div>
                <hr class = "box-bar">
            </article>`



let resultArticleTemplate = `<article class = "result-product"> <!--Produit-->
                <div class = "name-img-flex">
                    <img src="./assets/images/skyr-1.png" alt="Image d'un produit">
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
                    <button class = "small-button soft-border soft-shadow">Ajouter</button>
                </div>
                <hr class = "box-bar">
            </article>`



    let pendingArticleTemplate = `<article class = "pending-food-item"> <!--Aliment-->
                    <div class = "name-img-flex">
                        <img src=${imgUrl} alt="${imgAlt}">
                        <h3>${name}</h3>
                    </div>
                    <div class = "text-button-flex">
                        <p>Quantité (g) : </p>
                        <div>
                            <button class = "amount-button">-</button> <!--Signe moins-->
                            <div class = "number-box soft-border">
                                <p>100 g</p>
                            </div>
                            <button class = "amount-button">+</button> <!--Signe plus-->
                        </div>
                            <button class = "amount-button">X</button> <!--Bouton supprimer-->
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
                