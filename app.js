const searchInput = document.getElementById('search');
const submit = document.getElementById('submit');
const mealsEle = document.getElementById('meals');
const resultHead = document.getElementById('result-heading')
const single_mealEl = document.getElementById('sMeal');
const button = document.getElementById('button')


const searchMeal = meals => {
    meals.preventDefault();

    const term = searchInput.value

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {


            single_mealEl.innerHTML = ""

            if (data.meals === null) {
                resultHead.innerHTML = `<p>there are no search result</p>`
            } else {

                mealsEle.innerHTML = data.meals
                    .map(meal => `
    <div class="meal">
    <img onclick="displayFoodInfo(${meal.idMeal})" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="mealInfo" mealId="${meal.idMeal}">
    <h3>${meal.strMeal}</h3>
    </div>
    </div>
    `
                    ).join("");
            }
        })
    search.value = "";

}

button.addEventListener('click', searchMeal)





const getMealById = mealId => {

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {

            const meal = data.meals[0];

            addMealToDom(meal);
        })
}

const addMealToDom = meal => {

    const ingredients = [];
    for (let i = 1; 1 <= 20; i++) {

        if (meal[`strIngredient${i}`]) {
            ingredients.push(

                `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
            )

        } else { break; }
    }
    single_mealEl.innerHTML = `

<div class="single-meal">
<img src="${meal.strMealThumb}"/>
<h1 class="singleMealHead">${meal.strMeal}</h1>

</div>
<div class="main">
<h2 class="ingredients">INGREDIENTS</h2>
<ul class="ulColor">
${ingredients.map(ing => `<li class="liColor">${ing}</li>`).join("")}
</ul>
</div>

`
}


const displayFoodInfo = mealId => {

    getMealById(mealId);
}











