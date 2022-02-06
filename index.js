// www.themealdb.com/api/json/v1/1/search.php?s=tomato

// Tester si le lien renvoie des données dans le navigateur

// Créer une fonction pour "fetcher" les données, passer ces données dans une variable. 

// Affiche les données (12max) via une fonction (map) :
// Recette, origine, image.

let recetteData = [];

async function fetchRecette() {
    await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput.value
        )
        .then((res) => res.json())
        .then((data) => (recetteData = data.meals));

    console.log(recetteData);   
    recetteDisplay();
}
function recetteDisplay() {
    if (recetteData === null) {
        mealContainer.innerHTML = "<h2>Aucun résultat</h2>";
        return;
    }
    if (searchInput.value === "") {
        mealContainer.innerHTML = "<h3>Veuillez faire une recherche</h3>";
        return;

    }
    mealContainer.innerHTML = recetteData
    .slice(0, 12)
    .map((meal) => {
        let ingredients = [];

        for (i = 1; i < 21; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(
                    `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`
                );
            }
        }

        return `    
        <div class="card">
        <h2>${meal.strMeal}</h2>
        <h4>${meal.strArea}</h4>
        <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}"></img>
        <ul>${ingredients.join("")}</ul>
        <iframe width="759" height="427" src=${meal.strYoutube.replace(
            "watch?v=",
            "embed/"
        )} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `;
    })    
    .join("");
}
// searchInput.addEventListener("input",  fetchRecette);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchRecette();
});

// window.addEventListener("load", fetchRecette);
