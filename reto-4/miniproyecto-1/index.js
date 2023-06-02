// Variable global para poder eliminar las entrys agregadas
let newEntrys = 0;

function calculateIncome(event) {
  event.preventDefault();

  const incomeEntries = document.querySelectorAll(".income-entry");
  let totalMonthlyIncome = 0;

  incomeEntries.forEach((entry) => {
    const hourlyWageInput = entry.querySelector("input:nth-of-type(1)");
    const weeklyHoursInput = entry.querySelector("input:nth-of-type(2)");

    const hourlyWage = parseFloat(hourlyWageInput.value);
    const weeklyHours = parseFloat(weeklyHoursInput.value);

    if (!isNaN(hourlyWage) && !isNaN(weeklyHours)) {
      const monthlyIncome = hourlyWage * weeklyHours * 4; // Suponiendo 4 semanas al mes
      totalMonthlyIncome += monthlyIncome;
    }
  });

  document.getElementById("results").textContent = "Resultados:";
  document.getElementById(
    "monthly-income"
  ).textContent = `Ingreso mensual: $${totalMonthlyIncome.toFixed(2)}`;
  document.getElementById("annual-income").textContent = `Ingreso anual: $${(
    totalMonthlyIncome * 12
  ).toFixed(2)}`;
}

function addIncome() {
  // Agregar otro ingreso
  newEntrys++;
  const incomeContainer = document.getElementById("income-container");
  const newIncomeEntry = document.createElement("div");
  newIncomeEntry.className = "income-entry new-income";
  newIncomeEntry.innerHTML = `
      <hr/>
      <label for="hourly-wage" class="form-label">Salario por hora:</label>
      <input type="number" class="form-control" placeholder="Ingrese el salario por hora" required/>
      
      <label for="weekly-hours" class="form-label">Horas trabajadas por semana:</label>
      <input type="number" class="form-control" placeholder="Ingrese las horas trabajadas por semana" required />
    `;
  incomeContainer.appendChild(newIncomeEntry);
}

function cleanForm() {
  // Limpiar los inputs
  document.getElementById("income-form").reset();

  // Limpiar resultados
  document.getElementById("results").textContent = "";
  document.getElementById("monthly-income").textContent = "";
  document.getElementById("annual-income").textContent = "";

  // Eliminar entrys agregadas
  const parentNode = document.getElementById("income-container");
  const childNode = document.getElementsByClassName("new-income");
  for (let i = 0; i <= newEntrys; i++) {
    newEntrys--;
    parentNode.removeChild(childNode[newEntrys]);
    
  }
}
