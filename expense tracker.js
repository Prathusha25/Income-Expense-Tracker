let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
    const incomeList = document.getElementById("income-list");
    const expenseList = document.getElementById("expense-list");
    const totalIncome = document.getElementById("income-total");
    const totalExpense = document.getElementById("expense-total");
    const balance = document.getElementById("balance");

    incomeList.innerHTML = "";
    expenseList.innerHTML = "";
    let incomeSum = 0, expenseSum = 0;

    // Update Income UI
    incomes.forEach((income, index) => {
        incomeSum += income.amount;
        incomeList.innerHTML += `<li>
            ${income.source} - $${income.amount.toLocaleString()}
            <button class="delete-btn" onclick="deleteIncome(${index})">X</button>
        </li>`;
    });

    // Update Expense UI
    expenses.forEach((expense, index) => {
        expenseSum += expense.amount;
        expenseList.innerHTML += `<li>
            ${expense.description} - $${expense.amount.toLocaleString()} - ${expense.date} - ${expense.category}
            <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
        </li>`;
    });

    // Update totals and balance
    totalIncome.innerText = incomeSum.toLocaleString();
    totalExpense.innerText = expenseSum.toLocaleString();
    balance.innerText = (incomeSum - expenseSum).toLocaleString();

    // Change balance color (green for positive, red for negative)
    balance.style.color = (incomeSum - expenseSum) >= 0 ? "green" : "red";

    // Store data
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addIncome() {
    const source = document.getElementById("income-source").value;
    const amount = parseFloat(document.getElementById("income-amount").value);

    if (source === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid income details");
        return;
    }

    incomes.push({ source, amount });
    updateUI();

    // Clear input fields
    document.getElementById("income-source").value = "";
    document.getElementById("income-amount").value = "";
}

function addExpense() {
    const description = document.getElementById("expense-description").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;
    const category = document.getElementById("expense-category").value;

    if (description === "" || isNaN(amount) || amount <= 0 || date === "") {
        alert("Please enter valid expense details");
        return;
    }

    expenses.push({ description, amount, date, category });
    updateUI();

    // Clear input fields
    document.getElementById("expense-description").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-date").value = "";
    document.getElementById("expense-category").selectedIndex = 0;
}

function deleteIncome(index) {
    incomes.splice(index, 1);
    updateUI();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

function clearAll() {
    if (confirm("Are you sure you want to clear all data?")) {
        incomes = [];
        expenses = [];
        localStorage.removeItem("incomes");
        localStorage.removeItem("expenses");
        updateUI();
    }
}

// Initial UI update
updateUI();
