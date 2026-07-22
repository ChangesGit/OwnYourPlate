//TODO Update page calories, etc. depending on grams on startUp

let recipeIngredients = [];
let recipeIngredientsUntouched = [];

recipeDetailsStartUp();


const recipeBox = document.getElementById('recipe-box');
const minusPlusAmount = 50;
let cancelRecipeDetails = document.getElementById('cancel-recipe-details');
let saveRecipeDetails = document.getElementById('save-recipe-details');


recipeBox.addEventListener('input', (e) => {
    console.log(e.target);
    if(e.target.matches(".grams-count")) {
        console.log(e.target.value);
        const inputBox = e.target;
        const container = inputBox.closest(".pending-food-item");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".delete-pending");
        const productName = smallButton.getAttribute("data-product-name");
        const index = recipeIngredients.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = recipeIngredients[index];
        grams = Number(inputBox.value);
        recipeIngredients[index].quantity = grams;
        console.log(recipeIngredients[index]);
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
    }
})

//Boutons quantités + et -
recipeBox.addEventListener('click', (e) => {
    const target = e.target;
    if(target.matches(".plus-button")) {
        const container = target.closest(".pending-food-item");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".delete-pending");
        const productName = smallButton.getAttribute("data-product-name");
        const index = recipeIngredients.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = recipeIngredients[index];

        //On modifie les inputs
        inputBox.value = Number(inputBox.value) + minusPlusAmount;
        grams = Number(inputBox.value);
        recipeIngredients[index].quantity = grams;
        
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
    }
    if(target.matches(".minus-button")) {
        const container = target.closest(".pending-food-item");
        const inputBox = container.querySelector(".grams-count");

        //On récupère le nom du produit grâce au data-product-name du bouton"
        const smallButton = container.querySelector(".delete-pending");
        const productName = smallButton.getAttribute("data-product-name");
        const index = recipeIngredients.findIndex(e => e.name.toLowerCase() === productName.toLowerCase());
        const product = recipeIngredients[index];


        //On modifie les inputs
        if(Number(inputBox.value) - minusPlusAmount >= 0) {
            inputBox.value = Number(inputBox.value) - minusPlusAmount;
        }
        
        grams = Number(inputBox.value);
        recipeIngredients[index].quantity = grams;
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
     }

     //Bouton supprimer
     if(target.matches(".delete-pending")) {
        const container = target.closest('.pending-food-item');
        const modal = target.nextElementSibling;
        modal.showModal();
     }
})


recipeBox.addEventListener('click', (e) => {
    if(e.target.matches('#cancel-recipe-details')) {
        document.getElementById('cancel-confirmation-modal').showModal();
    }

    if(e.target.matches('#cancel-confirmation-button')) {
        resetRecipeDetails();
        recipeDetailsPlacer(recipeIngredientsUntouched);
        recipeIngredients = structuredClone(recipeIngredientsUntouched);
    }

    if(e.target.matches('#save-recipe-details')) {
        document.getElementById('save-confirmation-modal').showModal();
    }

    if(e.target.matches('#save-confirmation-button')) {
        updateRecipe(recipeIngredients);
        document.getElementById('save-confirmation-modal').close();
    }
})

