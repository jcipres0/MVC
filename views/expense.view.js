class ExpenseView {
    constructor(){
        this.balance = document.getElementById('balance');
        this.money_plus = document.getElementById('money-plus');
        this.money_minus = document.getElementById('money-minus');
        this.list = document.getElementById('list');
        this.form = document.getElementById('form');
        this.text = document.getElementById('text');
        this.amount = document.getElementById('amount');
       
    }

    //tal como hace en todo.view inico el listener para el submit
    bindAddTransaction(handler){
      this.form.addEventListener("submit", event => {
        event.preventDefault();
        //hago las comprobaciones que hace script.js que corresponden a que en pantalla no se intente meter un gasto sin cantidad o texto
        if (this.text.value.trim() === '' || this.amount.value.trim() === '') {
          alert('Please add a text and amount');
        } else {
          
          //tengo que devolver el control a la función handler, pero tal como lo he diseñado, generando el id en model y esperando handler un id, text y amount ahora no sé cómo pasar un id
          handler()


          this.text.value='';
          this.amount.value='';
        }
      });
    }

    //tal como hace en todo.view inicio el listener para delete
    bindRemoveTransaction(handler){
      this.list.addEventListener('click', event => {
        //esta línea comprueba que donde he hecho clic sea de la clase delete-btn y devuelvo el id de la línea que quiero borrar. Esto lo copio de todo.view, pero es la parte que me cuesta ver.
        if(event.target.className==='delete-btn'){
          const id = event.target.parentElement.id;
          //le doy el control a la función handler que es handleRemoveTransaction con el id que tiene que borrar 
          handler(id);
        }
      });
    }

    //si se llama a iteraDOM con remove es porque estoy borrando solo un gasto y no debo borrar todo
    iteraDOM(transactions,tipo){
      if(tipo !='remove'){
        this.list.innerHTML = '';
      }
      transactions.forEach(trn =>{
        //cada vez que tenga que actualizar la lista de gastos, porque se añadan o borren
        this.addTransactionDOM(trn);
      });
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
      this.list.appendChild(item);
    }

    muestraBalance(total, income, expense) {
      this.balance.innerText = `$${total}`;
      this.money_plus.innerText = `$${income}`;
      this.money_minus.innerText = `$${expense}`;
    }
}



