import "./css/style.css";
import Initial from "./intial";
import CalorieTracker from "./Tracker";
import { Meal, Workout } from "./item";

//App class
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._loadEventListener();
  }

  _loadEventListener() {
    document
      .querySelector("#form1")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .querySelector("#form2")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
    document
      .getElementById("meal_list")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .getElementById("workout_list")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
    document
      .getElementById("filter1")
      .addEventListener("keyup", this._filterItem.bind(this, "meal"));
    document
      .getElementById("filter2")
      .addEventListener("keyup", this._filterItem.bind(this, "workout"));
    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));

    this._tracker.loadItem();
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}_name`);
    const calorie = document.getElementById(`${type}_calorie`);
    if (calorie.value === "" || name.value === "" || isNaN(+calorie.value)) {
      alert("fill them correctly");
      name.value = "";
      calorie.value = "";
      return;
    }
    if (type === "meal") {
      const meal = new Meal(name.value, +calorie.value);
      this._tracker.addMeal(meal);
      name.value = "";
      calorie.value = "";
      const form1 = document.getElementById("form1");
      form1.classList.add("hide");
    } else if (type === "workout") {
      const workout = new Workout(name.value, +calorie.value);
      this._tracker.addWorkout(workout);
      name.value = "";
      calorie.value = "";
      const form2 = document.getElementById("form2");
      form2.classList.add("hide");
    }
  }

  _removeItem(type, e) {
    if (e.target.classList.contains("fa-xmark")) {
      if (confirm("Are u sure?")) {
        const id = e.target.parentNode.parentNode.getAttribute("id");
        type === "meal"
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.parentNode.parentNode.remove();
      }
    }
  }

  _filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}_list .form-items`).forEach((item) => {
      const name = item.firstChild.innerHTML;
      if (name.toLowerCase().indexOf(text) !== -1) item.style.display = "flex";
      else item.style.display = "none";
    });
  }

  _reset() {
    this._tracker.reset();
    document.getElementById("meal_list").innerHTML = "";
    document.getElementById("workout_list").innerHTML = "";
  }
}

const app = new App();
