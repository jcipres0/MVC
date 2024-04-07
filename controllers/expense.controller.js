class ExpenseController {
    constructor (service, view){
        this.service=service;
        this.view=view;
        this.view.bindAddTransaction(this.handleAddTransaction.bind(this));
        this.view.bindRemoveTransaction(this.handleRemoveTransaction.bind(this));
  
        /*lo primero que hace script.js es definir localStorageTransactions y transactions que me lo llevo a service y luego ejecutar init(), finalmente realiza en addEventlistener para borrar y añadir que me los he llevado al view*/
        this.init();
    }
    
    init(){
      //iteraDOM es el forEach(addTransactionDOM) y lo tengo que llevar a view. Pongo un segundo parámetro porque iteraDOM tiene una líena "this.list.innerHTML = '';" que vacía gastos y cuando hago remove no debe pasar por esta línea
      this.view.iteraDOM(this.service.transactions,'init');
      //aquí tengo que actualizar el valor de gastos el de ingresos y el total
      this.updateValuesCalc(this.service.transactions);
    }

    //añado el handle de añadir tal como se hace en todo.controller y necesita un id, texto y cantidad
    handleAddTransaction(id,text,amount){
      //lo que hace script.js es crear la transacción
      const transaction2={
        id:id,
        text:text.value,
        amount:+amount.value
      }
      //luego hace el push, pero no lo debo hacer aquí, me lo llevo a service y updateo localStorage llamando a updateLocalStorage en la misma addTransaction
      this.service.addTransaction(transaction2);
      //acutalizo en pantalla el gasto recién creado
      this.view.addTransactionDOM(transaction2);
      //al final de añadir un gasto hay que actualizar el valor de gastos, ingresos y total
      this.updateValuesCalc(transaction2);
    }

    //añado el handle para borrar un gasto tal como creo se hace en todo.controller
    handleRemoveTransaction(id){
      //de esto ser encargará service y es el mismo código que script.js excepto el init() pues lleva implicito una actualización de pantalla que será responsabilidad de view
      const transaction4=this.service.removeTransaction(id);
      //el segundo parámetro es remove para que no pase por esta líea de iteraDOM "this.list.innerHTML = '';"
      this.view.iteraDOM(transaction4,'remove');
      this.updateValuesCalc(transaction4);
    }

    //este método me lo tengo que llevar a service, pero uso this.view.muestraBalance y no tengo claro cómo hacerlo
    updateValuesCalc(trns){
      const amounts = trns.map(transaction => transaction.amount);

      const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

      const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

      const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
      //tengo que actualizar los valores en pantalla así que me lo llevo al view
      this.view.muestraBalance(total,income,expense);
    }

}