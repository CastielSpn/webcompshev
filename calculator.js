class FinancialCalculator extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      /* Общие стили для контейнера */
      .calculator-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
      }

      /* Стили для заголовка */
      h2 {
        margin-top: 0;
        color: #333;
      }

      /* Стили для элементов формы */
      label {
        display: block;
        margin-bottom: 10px;
      }

      input[type="number"] {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      }

      #results {
        margin-top: 20px;
        border-top: 1px solid #ccc;
        padding-top: 10px;
      }

      #results p {
        margin: 5px 0;
      }

      /* Стили для результатов */
      #results span {
        font-weight: bold;
        color: #007bff;
      }
    `;
    shadow.appendChild(style);

    const container = document.createElement("div");
    container.classList.add("calculator-container");
    container.innerHTML = `
      <h2>Финансовый калькулятор</h2>
      <form id="calculator-form">
        <label for="loan-amount">Сумма кредита:</label>
        <input type="number" id="loan-amount" name="loan-amount" required><br><br>
        
        <label for="interest-rate">Процентная ставка (%):</label>
        <input type="number" id="interest-rate" name="interest-rate" required><br><br>
        
        <label for="loan-term">Срок кредита (в месяцах):</label>
        <input type="number" id="loan-term" name="loan-term" required><br><br>
        
        <button type="submit">Рассчитать</button>
      </form>
      <div id="results">
        <p>Ежемесячный платеж: <span id="monthly-payment"></span></p>
        <p>Общая сумма: <span id="total-amount"></span></p>
        <p>Общий процент: <span id="total-interest"></span></p>
      </div>
    `;
    shadow.appendChild(container);

    const form = shadow.getElementById("calculator-form");
    form.addEventListener("submit", this.calculate.bind(this));

    console.log("Компонент создан");
  }

  calculate(event) {
    event.preventDefault();

    const loanAmount = parseFloat(this.shadowRoot.getElementById("loan-amount").value);
    const interestRate = parseFloat(this.shadowRoot.getElementById("interest-rate").value);
    const loanTerm = parseInt(this.shadowRoot.getElementById("loan-term").value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
      alert("Пожалуйста, введите корректные числовые значения.");
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTerm;
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / denominator;
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;

    this.shadowRoot.getElementById("monthly-payment").textContent = monthlyPayment.toFixed(2);
    this.shadowRoot.getElementById("total-amount").textContent = totalAmount.toFixed(2);
    this.shadowRoot.getElementById("total-interest").textContent = totalInterest.toFixed(2);

    console.log("Данные обновлены");
  }

  connectedCallback() {
    console.log("Компонент добавлен в DOM");
  }

  disconnectedCallback() {
    console.log("Компонент удален из DOM");
  }

  adoptedCallback() {
    console.log("Компонент перемещен в другое место в DOM");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Атрибут ${name} был изменен`);
  }

  static get observedAttributes() {
    return ["example-attribute"];
  }
}

customElements.define("financial-calculator", FinancialCalculator);
