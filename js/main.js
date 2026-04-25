// Frontend Mentor | Age calculator app:
// =====================================
// =====================================

// Selecting The Elements:
// ======================
let my_form = document.querySelector("form");

let day_container = document.querySelector(".day");
let day_input = document.querySelector("#day_input");
let day_label = document.querySelector(".day label");
let day_invalid_value = document.querySelector(".day .invalid_value");

let month_container = document.querySelector(".month");
let month_input = document.querySelector("#month_input");
let month_label = document.querySelector(".month label");
let month_invalid_value = document.querySelector(".month .invalid_value");

let year_container = document.querySelector(".year");
let year_input = document.querySelector("#year_input");
let year_label = document.querySelector(".year label");
let year_invalid_value = document.querySelector(".year .invalid_value");

let submit_btn = document.querySelector("button");

let person_years = document.querySelector(".person_years");
let person_month = document.querySelector(".person_month");
let person_days = document.querySelector(".person_days");

// Day Validation Function:
// -----------------------
function day_validation() {
  try {
    if (day_input.value === "") throw new Error("This field is required");
    if (parseInt(month_input.value) === 4) {
      if (parseInt(day_input.value) < 1 || parseInt(day_input.value) >= 31)
        throw new Error("Must be a valid day");
    } else {
      if (parseInt(day_input.value) < 1 || parseInt(day_input.value) > 31)
        throw new Error("Must be a valid day");
    }

    valid_value_set(day_input, day_invalid_value, day_label);
    return true;
  } catch (err) {
    invalid_value_set(day_input, day_invalid_value, day_label, err.message);
    return false;
  }
}

// Month Validation Function:
// -------------------------
function month_validation() {
  try {
    if (month_input.value === "") throw new Error("This field is required");

    if (
      parseInt(month_input.value, 10) < 1 ||
      parseInt(month_input.value, 10) > 12
    )
      throw new Error("Must be a valid month");

    valid_value_set(month_input, month_invalid_value, month_label);
    return true;
  } catch (err) {
    invalid_value_set(
      month_input,
      month_invalid_value,
      month_label,
      err.message,
    );
    return false;
  }
}

// Year Validation Function:
// -------------------------
function year_validation() {
  let current_date = new Date();
  try {
    if (year_input.value === "") throw new Error("This field is required");

    if (!day_input.value || !month_input.value) {
      return false;
    }
    let my_birthday = new Date(
      Number(year_input.value),
      Number(month_input.value) - 1,
      Number(day_input.value),
    );

    if (my_birthday > current_date) throw new Error("Must be in the past");

    valid_value_set(year_input, year_invalid_value, year_label);
    return true;
  } catch (err) {
    invalid_value_set(year_input, year_invalid_value, year_label, err.message);
    return false;
  }
}

// Error Set Function:
// ===================

function valid_value_set(input, invalid_value, label) {
  invalid_value.style.display = "none";
  input.classList.remove("invalid");
  label.classList.remove("invalid");
}

function invalid_value_set(input, invalid_value, label, message) {
  input.classList.add("invalid");
  invalid_value.style.display = "inline-block";
  invalid_value.textContent = message;
  label.classList.add("invalid");
}

// Geting The Age Function:
// =======================

function get_the_age() {
  let my_date = new Date();
  let my_birthday = new Date(
    year_input.value,
    month_input.value - 1,
    day_input.value,
  );

  let years = my_date.getFullYear() - my_birthday.getFullYear();
  let months = my_date.getMonth() - my_birthday.getMonth();
  let days = my_date.getDate() - my_birthday.getDate();

  if (days < 0) {
    months--;
    let pre_month = new Date(my_date.getFullYear(), my_date.getMonth(), 0);
    days += pre_month.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // person_years.textContent = years;
  // person_month.textContent = months;
  // person_days.textContent = days;
  animate_the_value(person_years, years);
  animate_the_value(person_month, months);
  animate_the_value(person_days, days);
}

// Animate The Age:
// ================

function animate_the_value(person_age, age) {
  let counter = 0;
  if (age === 0) {
    person_age.textContent = "00";
    return;
  }
  let my_interval = setInterval(() => {
    counter++;

    person_age.textContent = counter < 10 ? `0${counter}` : counter;

    if (counter >= age) {
      clearInterval(my_interval);
    }
  }, 20);
}

// Submit The Form and Get The Result:
// ==================================
my_form.addEventListener("submit", (e) => {
  e.preventDefault();
  day_validation();
  month_validation();
  year_validation();

  let is_valid_day = day_validation();
  let is_valid_month = month_validation();
  let is_valid_year = year_validation();

  if (is_valid_day && is_valid_month && is_valid_year) {
    get_the_age();
  } else {
    return false;
  }
});
