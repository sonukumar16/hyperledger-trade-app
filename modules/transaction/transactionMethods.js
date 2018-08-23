const {
    MyNetwork
} = require('../../lib');
const crypto = require('crypto');
const autoBind = require('auto-bind');
class transactionMethods {
    constructor() {
        this.registory;
        this.factory;
        this.namespace = MyNetwork.namespace;
        this.type = 'Trader'
        this.transactionType = 'Trade'
        autoBind(this);
    }
    async registryFactory(type) {
        let registry = await MyNetwork.bizNetworkConnection.getAssetRegistry(`${this.namespace}.${type}`)
        let factory = MyNetwork.bizNetworkConnection.getBusinessNetwork().getFactory()
        let serializer = MyNetwork.businessNetworkDefinition.getSerializer();
        return {
            registry,
            factory,
            serializer
        };
    }
    async createTransaction({commodityId,newOwnerId,...data}) {
        console.log("createTransaction data ::::::::::::::::::::::::", commodityId, newOwnerId,data);
        let {
            registry,
            factory,
            serializer
        } = await this.registryFactory('Commodity');
        let resource = serializer.fromJSON({
            '$class': `${this.namespace}.${this.transactionType}`,
            'commodity': commodityId,
             "newOwner": newOwnerId
          });
        let transactionResponse = await MyNetwork.bizNetworkConnection.submitTransaction(resource);
        return transactionResponse ? transactionResponse : resource;
    }
}
module.exports = transactionMethods;