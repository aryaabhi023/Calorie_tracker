//meal class
class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this._name = name;
    this._calories = calories;
  }
}

//workout class
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this._name = name;
    this._calories = calories;
  }
}

export { Meal, Workout };
