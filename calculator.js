class FinancialCalculator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
       
        form {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          box-sizing: border-box;
        }
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        #results {
          margin-top: 20px;
        }
        #results p {
          margin-bottom: 5px;
        }
        #results strong {
          font-weight: bold;
        }
      </style>
      <form id="calculator-form">
        <label for="loan-amount">Сумма кредита:</label>
        <input type="number" id="loan-amount" required><br><br>
        
        <label for="interest-rate">Процентная ставка (%):</label>
        <input type="number" id="interest-rate" required><br><br>
        
        <label for="loan-term">Срок кредита (месяцы):</label>
        <input type="number" id="loan-term" required><br><br>
        
        <button type="button" id="calculate-button">Рассчитать</button>
      </form>
      
      <div id="results">
        <p><strong>Ежемесячный платеж:</strong> <span id="monthly-payment"></span></p>
        <p><strong>Общая сумма к оплате:</strong> <span id="total-amount"></span></p>
        <p><strong>Общий процент по кредиту:</strong> <span id="total-interest"></span></p>
      </div>
    `;

    this.shadowRoot.getElementById("calculate-button").addEventListener("click", () => {
      this.calculate();
    });
  }

  calculate() {
    const loanAmount = parseFloat(this.shadowRoot.getElementById("loan-amount").value);
    const interestRate = parseFloat(this.shadowRoot.getElementById("interest-rate").value);
    const loanTerm = parseInt(this.shadowRoot.getElementById("loan-term").value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
      alert("Пожалуйста, введите корректные числовые значения.");
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTerm;
    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;

    this.shadowRoot.getElementById("monthly-payment").textContent = monthlyPayment.toFixed(2);
    this.shadowRoot.getElementById("total-amount").textContent = totalAmount.toFixed(2);
    this.shadowRoot.getElementById("total-interest").textContent = totalInterest.toFixed(2);

    console.log("Данные обновлены");
  }

  connectedCallback() {
    console.log("Компонент создан");
  }

  disconnectedCallback() {
    console.log("Компонент удален");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Атрибут ${name} изменен с ${oldValue} на ${newValue}`);
  }

  static get observedAttributes() {
    return ["loan-amount", "interest-rate", "loan-term"];
  }
}

customElements.define("financial-calculator", FinancialCalculator);
