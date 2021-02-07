const searchInput = document.getElementById('search');
    const submit = document.getElementById('submit');
    const mealsEle = document.getElementById('meals');
    const resultHead = document.getElementById('result-heading')
    const single_mealEl = document.getElementById('sMeal');
    const button = document.getElementById('button')


const searchMeal = meals=>{
meals.preventDefault();

const term = searchInput.value

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
.then(res => res.json())
.then(data => {
    
    
    single_mealEl.innerHTML=""

if (data.meals === null) {
   resultHead.innerHTML = `<p>there are no search result</p>`
}else{

   mealsEle.innerHTML = data.meals
   .map(meal=>`
    <div class="meal">
    <img onclick="displayFoodInfo(${meal.idMeal})" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="mealInfo" mealId="${meal.idMeal}">
    <h3>${meal.strMeal}</h3>
    </div>
    </div>
    `
    ) .join("");
}
}) 
search.value ="";

}

button.addEventListener('click', searchMeal)





const getMealById = mealId =>{

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
.then(res => res.json())
.then(data =>{

const meal = data.meals[0];

addMealToDom(meal);
})
}

const addMealToDom = meal =>{

const ingredients=[];
for (let i = 1; 1 <=20; i++) {
    
    if(meal[`strIngredient${i}`]){
ingredients.push(

    `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
)

    }else{break;}
}
single_mealEl.innerHTML=`

<div class="single-meal">
<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}"/>
</div>
<div class="singleMealInfo">



</div>

<div class="main">
<h2>ingredient</h2>
<ul>
${ingredients.map(ing => `<li>${ing}</li>`).join("")}
</ul>
</div>


`
}






const displayFoodInfo = mealId =>{

getMealById(mealId);
}






// const displayCountryDetail = name => {

//     const url = `https://restcountries.eu/rest/v2/name/${name}`
//    fetch(url)
//    .then(res => res.json())
//    .then(data => renderCountryInfo(data[0]));
//    }
   
//    const renderCountryInfo = country => {
   
//    console.log(country);
//    const countryDetails = document.getElementById('countryDetails')
//    countryDetails.innerHTML = `
//    <h1>${country.name}</h1>
//    <p>${country.population}</p>
//    <p>${country.region}</p>
//    <p>${country.subregion}</p>
//    <img src="${country.flag}">
//    `
   
//    }





