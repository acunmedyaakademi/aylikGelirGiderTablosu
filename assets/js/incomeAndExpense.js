let moneyForm = document.querySelector(".moneyForm");
let income = document.querySelector(".income");
let expense = document.querySelector(".expense");
let totalIncome = document.querySelector(".totalIncome");
let totalExpense = document.querySelector(".totalExpense");
let difference = document.querySelector(".difference");
let clearStorage = document.querySelector(".clearStorage");
let content = document.querySelector(".content");

let incomeAndExpenseArray = [];

if (typeof localStorage.incomeAndExpenseArray !== "undefined") {
  incomeAndExpenseArray = JSON.parse(localStorage.incomeAndExpenseArray);
  addData.disabled = true;
} else {
  addData.disabled = false;
}

handleRender();


addData.addEventListener("click", function () {
  incomeAndExpenseArray = [
    { id: 1, name: "Gelir Kaynağı 1", type: "gelir", money: 3481 },
    { id: 2, name: "Gelir Kaynağı 2", type: "gelir", money: 8420 },
    { id: 3, name: "Gelir Kaynağı 3", type: "gelir", money: 1013 },
    { id: 4, name: "Gelir Kaynağı 4", type: "gelir", money: 9057 },
    { id: 5, name: "Gelir Kaynağı 5", type: "gelir", money: 4976 },
    { id: 6, name: "Gelir Kaynağı 6", type: "gelir", money: 2134 },
    { id: 7, name: "Gelir Kaynağı 7", type: "gelir", money: 6574 },
    { id: 8, name: "Gelir Kaynağı 8", type: "gelir", money: 7812 },
    { id: 9, name: "Gelir Kaynağı 9", type: "gelir", money: 3325 },
    { id: 10, name: "Gelir Kaynağı 10", type: "gelir", money: 9187 },
    { id: 11, name: "Gider Kaynağı 1", type: "gider", money: 1249 },
    { id: 12, name: "Gider Kaynağı 2", type: "gider", money: 3210 },
    { id: 13, name: "Gider Kaynağı 3", type: "gider", money: 1987 },
    { id: 14, name: "Gider Kaynağı 4", type: "gider", money: 2976 },
    { id: 15, name: "Gider Kaynağı 5", type: "gider", money: 1876 },
    { id: 16, name: "Gider Kaynağı 6", type: "gider", money: 3450 },
    { id: 17, name: "Gider Kaynağı 7", type: "gider", money: 2100 },
    { id: 18, name: "Gider Kaynağı 8", type: "gider", money: 1750 },
    { id: 19, name: "Gider Kaynağı 9", type: "gider", money: 4890 },
    { id: 20, name: "Gider Kaynağı 10", type: "gider", money: 3021 },
  ];
  save();
  handleRender();
  addData.disabled = true;
});


function handle(e) {
  e.preventDefault();
  let formData = new FormData(moneyForm);
  let formObj = Object.fromEntries(formData);

  incomeAndExpenseArray.push({
    id: incomeAndExpenseArray.length + 1,
    name: formObj.name,
    type: formObj.selectValue,
    money: formObj.money,
  });

  handleRender();
  save();
  moneyForm.reset();
}

function handleRender() {
  income.innerHTML = `<tr>
          <th>AD</th>
          <th>TUTAR</th>
        </tr>`;
  expense.innerHTML = `<tr>
  <th>AD</th>
  <th>TUTAR</th>
</tr>`;

  let sumExpense = 0;
  let sumIncome = 0;

  for (let i = 0; i < incomeAndExpenseArray.length; i++) {
    if (incomeAndExpenseArray[i].type === "gelir") {
      income.innerHTML += `
      <td>${incomeAndExpenseArray[i].name}</td>
      <td>${incomeAndExpenseArray[i].money}</td>
      `;

      sumIncome += Number(incomeAndExpenseArray[i].money);
    } else if (incomeAndExpenseArray[i].type === "gider") {
      expense.innerHTML += `
      <td>${incomeAndExpenseArray[i].name}</td>
      <td>${incomeAndExpenseArray[i].money}</td>
      `;

      sumExpense += Number(incomeAndExpenseArray[i].money);
    }
  }

  totalIncome.innerText = `
  Toplam : ${sumIncome}
  `;
  totalExpense.innerText = `
   Toplam : ${sumExpense}
  `;

  if (sumIncome > sumExpense) {
    difference.innerText = `
   Kardasın: ${sumIncome - sumExpense} 
  `;
  } else if (sumIncome < sumExpense) {
    difference.innerText = `
   Zarardasın: ${sumExpense - sumIncome} 
  `;
  }
}

moneyForm.addEventListener("submit", handle);

function save() {
  localStorage.incomeAndExpenseArray = JSON.stringify(incomeAndExpenseArray);
}

function clearLocal() {
  localStorage.clear();
  income.innerHTML = '';
  expense.innerHTML = '';
  difference.innerText = '';
  incomeAndExpenseArray = [];
  handleRender();
  moneyForm.reset();
  addData.disabled = false;

}

clearStorage.addEventListener('click' , clearLocal)
