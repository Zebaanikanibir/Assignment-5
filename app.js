
const searchInput = document.getElementById('search');
const mealsEle = document.getElementById('meals');
const resultHead = document.getElementById('result-heading')
const single_mealEl = document.getElementById('sMeal');
const button = document.getElementById('button')


const searchMeal = () => {

    const term = searchInput.value

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {


            single_mealEl.innerHTML = ""

            if (data.meals === null) {
                resultHead.innerHTML = `<p class="error">no search result! try again</p>`
            } else {

                mealsEle.innerHTML = data.meals
                    .map(meal => `
    <div class="meal">
    <img onclick="displayMealInfo(${meal.idMeal})" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="mealInfo" mealId="${meal.idMeal}">
    <h3 class="mealsName">${meal.strMeal}</h3>
    </div>
    </div>
    `
                    )
                    .join("");
            }
        })
    search.value = "";
    }else{resultHead.innerHTML = `<p class="error">no search result! try again</p>`}

}




const displayMealInfo = mealId => {

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDom(meal);
        })
}

const addMealToDom = meal => {

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {

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
<h4 class="ingredients">Ingredients</h4>
<ul class="ulColor">
${ingredients.map(ing => `<li class="liColor">${ing}</li>`).join("")}
</ul>
</div>

`
}












