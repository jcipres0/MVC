
class Transaction {
    constructor(text, amount) {
        this.id = this.generateID();
        this.text = text;
        this.amount = amount;
    }

    // tal como se hace en todo.model el id lo genero al crear la transacción
    generateID() {
        return Math.floor(Math.random() * 100000000);
    }
}

