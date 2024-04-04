class ExpenseView {
    constructor(){
        this.balance = this.getElementById('balance');
        this.money_plus = this.getElementById('money-plus');
        this.money_minus = this.getElementById('money-minus');
        this.list = this.getElementById('list');
        this.form = this.getElementById('form');
        this.text = this.getElementById('text');
        this.amount = this.getElementById('amount');
        this.form.addEventListener('submit', addTransaction);
    }

    init(transactions){
      this.list.innerHTML = '';
      transactions.forEach(addTransactionDOM);
    }
    addTransactionDOM(transaction) {
      // Get sign
      const sign = transaction.amount < 0 ? '-' : '+';
    
      const item = document.createElement('li');
    
      // Add class based on value
      item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    
      item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
      )}</span> <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
      })">x</button>
      `;
    
      list.appendChild(item);
    }
    updateDisplay(transactions,array){
      this.addTransactionDOM(transactions);
      this.balance.innerText = `$${array[0]}`;
      this.moneyPlus.innerText = `$${array[1]}`;
      this.moneyMinus.innerText = `$${array[2]}`;
    }

    bindRemoveTransaction(handler) {
      this.list.addEventListener('click', event => {
        if (event.target.className==='delete-btn') {
          const id = event.target.parentElement.id;
          handler(id);
        }
      });
    }
}

