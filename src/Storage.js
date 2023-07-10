//Storage class
class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }
    return calorieLimit;
  }
  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalorie(defaultTotalCalorie = 0) {
    let totalCalorie;
    if (localStorage.getItem("totalCalorie") === null)
      totalCalorie = defaultTotalCalorie;
    else totalCalorie = +localStorage.getItem("totalCalorie");
    return totalCalorie;
  }

  static updateTotalCalorie(calorie) {
    localStorage.setItem("totalCalorie", calorie);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem("meals") === null) meals = [];
    else meals = JSON.parse(localStorage.getItem("meals"));
    return meals;
  }

  static saveMeals(meal) {
    let meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static removeMeals(id) {
    let meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem("workouts") === null) workouts = [];
    else workouts = JSON.parse(localStorage.getItem("workouts"));
    return workouts;
  }

  static saveWorkouts(workout) {
    let workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeWorkouts(id) {
    let workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem("totalCalorie");
    localStorage.removeItem("meals");
    localStorage.removeItem("workouts");
  }
}

export default Storage;
