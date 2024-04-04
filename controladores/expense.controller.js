class ExpenseController {
    constructor (service, view){
        this.service=service;
        this.view=view;

        this.view.bindRemoveTransaction(this.handleRemoveTransaction.bind(this));
    }
    
    handleRemoveTransaction(id){
      this.service.removeTransaction(id);
      this.service.updateLocalStorage();
      const expenseValores=this.service.updateValues(this.service.transactions);
      this.view.updateDisplay(this.service.transactions, expenseValores);
    }
}
