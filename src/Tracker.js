import Storage from "./Storage";

class CalorieTracker {
  //Calorie Tracker constructor
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalorie();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();
    this._displayCalorieLimit();
    this._displayTotalCalories();
    this._displayCalorieConsumed();
    this._displayCalorieBurned();
    this._displayCalorieRemaining();
    this._displayProgress();
    document
      .getElementById("set_limit")
      .addEventListener("click", this._setLimit.bind(this));
  }

  //Adding meals
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal._calories;
    Storage.saveMeals(meal);
    Storage.updateTotalCalorie(this._totalCalories);
    this._displayNewItem(meal, "meal");
    this._render();
  }

  //Adding workouts
  addWorkout(workout) {
    this._totalCalories -= workout._calories;
    this._workouts.push(workout);
    Storage.saveWorkouts(workout);
    Storage.updateTotalCalorie(this._totalCalories);
    this._displayNewItem(workout, "workout");
    this._render();
  }

  //remove Meals
  removeMeal(dataId) {
    let index;
    this._meals.forEach((element, i) => {
      if (element.id === dataId) index = i;
    });
    this._totalCalories -= this._meals[index]._calories;
    Storage.updateTotalCalorie(this._totalCalories);
    Storage.removeMeals(dataId);
    this._meals.splice(index, 1);
    this._render();
  }

  //remove workouts
  removeWorkout(dataId) {
    let index;
    this._workouts.forEach((element, i) => {
      if (element.id === dataId) index = i;
    });
    this._totalCalories += this._workouts[index]._calories;
    Storage.updateTotalCalorie(this._totalCalories);
    Storage.removeWorkouts(dataId);
    this._workouts.splice(index, 1);
    this._render();
  }

  //Display the calarie Limit
  _displayCalorieLimit() {
    const calorieLimit = document.getElementById("limit_count");
    calorieLimit.innerHTML = this._calorieLimit;
  }

  //display the total Calories gain or loss
  _displayTotalCalories() {
    const TotalCount = document.getElementById("total_count");
    TotalCount.innerHTML = this._totalCalories;
  }

  //display the total calorie consumed
  _displayCalorieConsumed() {
    const consumedCount = document.getElementById("consumed_count");
    const totalConsumed = this._meals.reduce(
      (total, meal) => total + meal._calories,
      0
    );
    consumedCount.innerHTML = totalConsumed;
  }

  //display the total calorie burned
  _displayCalorieBurned() {
    const burnedCount = document.getElementById("burned_count");
    const totalBurned = this._workouts.reduce(
      (total, workout) => total + workout._calories,
      0
    );
    burnedCount.innerHTML = totalBurned;
  }

  //display the total calorie remaining
  _displayCalorieRemaining() {
    const remainingCount = document.getElementById("remaining_count");
    const count = this._calorieLimit - this._totalCalories;
    remainingCount.innerHTML = count;
    if (count < 0) {
      const card5 = document.getElementById("card5");
      card5.style.color = "white";
      card5.style.backgroundColor = "#a50000";
    } else {
      const card5 = document.getElementById("card5");
      card5.style.color = "rgb(37, 32, 32)";
      card5.style.backgroundColor = "#96b0cb";
    }
  }

  //Manage the progress bar
  _displayProgress() {
    const progressInc = document.getElementById("progress_inc");
    const wd = (this._totalCalories * 100) / this._calorieLimit;
    if (wd > 100) progressInc.style.backgroundColor = "#a50000";
    else progressInc.style.backgroundColor = "green";
    progressInc.style.width = `${Math.min(100, wd)}%`;
  }

  //display new item adding inside meal and workout list
  _displayNewItem(data, type) {
    if (type == "meal") {
      const mealList = document.getElementById(`${type}_list`);
      const div = document.createElement("div");
      div.className = "form-items";
      div.id = data.id;
      div.innerHTML = `<h2 class="item-name">${data._name}</h2>
        <div class="meal_count">${data._calories}</div>
        <button class="cancel"><i class="fas fa-xmark"></i></button>`;
      mealList.appendChild(div);
    } else if (type == "workout") {
      const workoutList = document.getElementById(`${type}_list`);
      const div = document.createElement("div");
      div.className = "form-items";
      div.id = data.id;
      div.innerHTML = `<h2 class="item-name">${data._name}</h2>
        <div class="workout_count">${data._calories}</div>
        <button class="cancel"><i class="fas fa-xmark"></i></button>`;
      workoutList.appendChild(div);
    }
  }

  //load the meal and workout item inside local storage
  loadItem() {
    this._meals.forEach((meal) => this._displayNewItem(meal, "meal"));
    this._workouts.forEach((workout) =>
      this._displayNewItem(workout, "workout")
    );
  }

  //set the daily limit
  _setLimit() {
    let limit = +prompt("Set the Calorie limit", this._calorieLimit);
    console.log(limit);
    this._calorieLimit = limit;
    Storage.setCalorieLimit(limit);
    this._render();
  }

  //reset everything
  reset() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  //render after something is update
  _render() {
    this._displayCalorieLimit();
    this._displayTotalCalories();
    this._displayCalorieConsumed();
    this._displayCalorieBurned();
    this._displayCalorieRemaining();
    this._displayProgress();
  }
}

export default CalorieTracker;
