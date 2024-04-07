class ExpenseService {
    constructor(){
        this.localStorageTransactions= JSON.parse(localStorage.getItem('transactions'));
        this.transactions=localStorage.getItem('transactions') !== null ? this.localStorageTransactions : [];
      }
    updateLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    };
       
    addTransaction(transaction3){
      this.transactions.push(transaction3);
      this.updateLocalStorage();
    };

    removeTransaction(id){
      // es el mismo código que script.js excepto init() que no puedo hacerlo aquí poruqe cada vez que se llama a init() en script.js actualiza la pantalla y eso corresponde a view
      this.transactions = this.transactions.filter(transaction => transaction.id !== id);
      this.updateLocalStorage();
    };

    //este método me lo tengo que llevar a service, pero uso this.view.muestraBalance y no tengo claro cómo hacerlo
}


