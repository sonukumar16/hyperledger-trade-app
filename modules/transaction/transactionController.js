const Methods = require('./transactionMethods');
class TransactionCtrl extends Methods {
    async create(req, res) {
        try {
            let transaction = await super.createTransaction(req.body);
            console.log("Create of Transaction Controller ::::::::::::::::::::::::", transaction)
            return res.send(transaction)
        } catch (err) {
            console.log("Error of Create Transaction Controller ::::::::::::::::::::::::", err)
        }
    }
}
module.exports = TransactionCtrl;