const searchbtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal")
console.log(mealList)
const mealdetailcontent = document.querySelector(".meal-details-content")
const recipeclosebtn = document.getElementById("recipe-close-btn")

// add event listner

searchbtn.addEventListener("click", getmeallist)
mealList.addEventListener("click",getmealrecipe)
recipeclosebtn.addEventListener("click",()=>{
    mealdetailcontent.parentElement.classList.remove("showRecipe")
})

// get meal list which matches with the ingruideient 
function getmeallist() {
    let searchinputtxt = document.getElementById("search-input").value.trim();
    // console.log(searchinputtxt)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinputtxt}`).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        let html = "";
        if (data.meals) {

            data.meals.forEach(meal => {
                html += ` <div class="meal-item" data-id=${meal.idMeal}>
                <div class="meal-img">
                    <img src="${meal.strMealThumb}"
                        alt="please wait">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get recipe</a>
                </div>
            </div>`

            })
            mealList.classList.remove("note-found")
            // console.log(html)
            
            
        }else{
            html="sorry we connot find your favourite dish"
            mealList.classList.add("note-found")
            
        }
        mealList.innerHTML = html;
    });
}


// get recipe of the meal 
function getmealrecipe(e){
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains("recipe-btn")){
        let mealitem=e.target.parentElement.parentElement
        console.log(mealitem)

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealitem.dataset.id}`).then(response=>response.json()).then(data=>mealRecipeModal(data.meals));
    }


}
//  create a fiunction 
function mealRecipeModal(meal){
    console.log(meal)
    meal=meal[0];
    let html =` <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>instruction</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="" >
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="blank">watch video</a>
    </div>
    `
    mealdetailcontent.innerHTML=html;
    mealdetailcontent.parentElement.classList.add("showRecipe")
}

