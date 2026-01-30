// === State ===
const bank = [];
const odds = [];
const evens = [];

// Adds given number to bank
const addToBank = (number) => {
  bank.push(number);
  render();
};

//Moves the first number from bank to corresponding odds or evens bucket without rerendering
const sort = () => {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
};

//Sorts first number in the bank
const sortOne = () => {
  sort();
  render();
};

//Sorts all of numbers in the bank
const sortAll = () => {
  while (bank.length) {
    sort();
  }
  render();
};

// === Components ===
//Form that allows user to add a number to the bank
//sort one number
//or sort all numbers
const NumberForm = () => {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" />
    </label>
    <button type="submit" data-action="add"> Add number</button>
    <button type="submit" data-action="sortOne"> Sort 1</button>
    <button type="submit" data-action="sortAll"> Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");
      if (number === null || number === "") return;
      addToBank(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });
  return $form;
};

//A single number in a NumberBank
const NumberInBank = (n) => {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
};

//A labeled group of Numbers
const NumberBank = (label, numbers) => {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
  `;
  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);
  return $bank;
};

// === Render ===
const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <NumberForm></NumberForm>
      <NumberBank id="bank"></NumberBank>
      <NumberBank id="odds"></NumberBank>
      <NumberBank id="evens"></NumberBank>
    `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberBank#bank").replaceWith(NumberBank("Bank", bank));
  $app.querySelector("NumberBank#odds").replaceWith(NumberBank("Odds", odds));
  $app
    .querySelector("NumberBank#evens")
    .replaceWith(NumberBank("Evens", evens));
};
render();
