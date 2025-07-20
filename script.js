let MAX_FAVORITES = 5;

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
}

function changeTheme(theme) {
    if (theme === "default" || theme === "") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

function updateFavoritesLimit() {
    const limit = document.getElementById("favoritesLimit").value;
    MAX_FAVORITES = parseInt(limit);
    alert(`Favorites limit set to ${MAX_FAVORITES}`);
}

function showSpinner() {
    document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

async function searchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
    showSpinner();

    try {
        const res = await fetch(url);
        const data = await res.json();
        hideSpinner();
        displayRecipes(data.meals);
    } catch (error) {
        hideSpinner();
        console.error(error);
        document.getElementById("results").innerHTML = "<p>Error loading recipes. Try again later.</p>";
    }
}

async function filterCategory(category) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
    showSpinner();

    try {
        const res = await fetch(url);
        const data = await res.json();
        hideSpinner();

        if (data.meals) {
            const detailsPromises = data.meals.map(meal =>
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    .then(res => res.json())
                    .then(d => d.meals[0])
            );

            const detailedMeals = await Promise.all(detailsPromises);
            displayRecipes(detailedMeals);
        } else {
            document.getElementById("results").innerHTML = "<p>No recipes found.</p>";
        }
    } catch (error) {
        hideSpinner();
        console.error(error);
        document.getElementById("results").innerHTML = "<p>Error loading recipes.</p>";
    }
}

function displayRecipes(meals) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (meals) {
        meals.forEach(meal => {
            const div = document.createElement("div");
            div.className = "recipe";

            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {
                    ingredients.push(`${ingredient}${measure ? ` (${measure.trim()})` : ""}`);
                }
            }

            const isFavorite = checkFavorite(meal.idMeal);

            div.innerHTML = `
            <button class="fav-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${meal.idMeal}', '${meal.strMeal}', this)">★</button>
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p>${meal.strInstructions ? meal.strInstructions.substring(0, 400) : "No instructions available."}...</p>
            <div class="ingredients"><strong>Ingredients:</strong> ${ingredients.join(", ")}</div>
          `;

            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.innerHTML = "<p>No recipes found.</p>";
    }
}

function toggleFavorite(id, name, btn) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favs.some(f => f.id === id)) {
        favs = favs.filter(f => f.id !== id);
        btn.classList.remove("active");
    } else {
        if (favs.length >= MAX_FAVORITES) {
            alert(`You can only save up to ${MAX_FAVORITES} favorite recipes.`);
            return;
        }

        const note = prompt(`Add a note for "${name}" (optional):`);
        favs.push({ id, name, note });
        btn.classList.add("active");
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
}

function checkFavorite(id) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    return favs.some(f => f.id === id);
}

async function loadFavorites() {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favs.length === 0) {
        document.getElementById("results").innerHTML = "<p>You have no favorites saved.</p>";
        return;
    }

    showSpinner();
    try {
        const detailsPromises = favs.map(fav =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.id}`)
                .then(res => res.json())
                .then(d => {
                    const meal = d.meals[0];
                    meal._userNote = fav.note || "";
                    return meal;
                })
        );

        const detailedMeals = await Promise.all(detailsPromises);
        hideSpinner();
        displayFavorites(detailedMeals);
    } catch (error) {
        hideSpinner();
        console.error(error);
        document.getElementById("results").innerHTML = "<p>Error loading favorites.</p>";
    }
}

function displayFavorites(meals) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Your Favorites:</h2>";

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.className = "recipe";

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${ingredient}${measure ? ` (${measure.trim()})` : ""}`);
            }
        }

        div.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <p>${meal.strInstructions ? meal.strInstructions.substring(0, 400) : "No instructions available."}...</p>
          <div class="ingredients"><strong>Ingredients:</strong> ${ingredients.join(", ")}</div>
          <p><strong>Your Note:</strong> ${meal._userNote || "(none)"}</p>
        `;

        resultsDiv.appendChild(div);
    });
}

function handleSearch() {
    const query = document.getElementById("searchInput").value.trim();
    if (query !== "") {
        searchRecipes(query);
    }
}
function loadFavorites() {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    const panel = document.getElementById("favoritesPanel");
    const content = document.getElementById("favoritesContent");

    if (favs.length === 0) {
        content.innerHTML = "<p>You have no favorites saved.</p>";
        panel.classList.remove("hidden");
        return;
    }

    panel.classList.remove("hidden");
    content.innerHTML = "<div class='grid'>Loading...</div>";

    const detailsPromises = favs.map(fav =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.id}`)
            .then(res => res.json())
            .then(d => {
                const meal = d.meals[0];
                meal._userNote = fav.note || "";
                return meal;
            })
    );

    Promise.all(detailsPromises).then(meals => {
        content.innerHTML = "";
        meals.forEach(meal => {
            const div = document.createElement("div");
            div.className = "recipe";
            const ingredients = [];

            for (let i = 1; i <= 20; i++) {
                const ing = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ing && ing.trim()) {
                    ingredients.push(`${ing}${measure ? ` (${measure.trim()})` : ""}`);
                }
            }

            div.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p>${meal.strInstructions.substring(0, 400)}...</p>
                <div class="ingredients"><strong>Ingredients:</strong> ${ingredients.join(", ")}</div>
                <p><strong>Your Note:</strong> ${meal._userNote || "(none)"}</p>
            `;
            content.appendChild(div);
        });
    });
}

function closeFavorites() {
    document.getElementById("favoritesPanel").classList.add("hidden");
}