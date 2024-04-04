class ExpenseService {
    constructor(){
        this.localStorageTransactions== JSON.parse(localStorage.getItem('transactions'));
        this.transactions=localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
    }
    updateLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
    updateValues(myTransactions) {
      const transactions = myTransactions;
      const amounts = transactions.map(transaction => transaction.amount);

      const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

      const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
      const expense = (
          amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
          -1
        ).toFixed(2);
      return [total,income,expense];
    }
}
