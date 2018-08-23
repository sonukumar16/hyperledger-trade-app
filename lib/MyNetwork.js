const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const autoBind = require('auto-bind');
class MyNetwork {
    constructor() {
        this.currentParticipantId;
        this.cardName = 'admin@tutorial-network';
        this.bizNetworkConnection = new BusinessNetworkConnection();
        this.businessNetworkDefinition;
        this.businessNetworkName;
        this.namespace = 'org.example.mynetwork'
        autoBind(this)
    }

    /**
     *
     *
     * @returns {*Object} , definition of business network
     * @memberof MyNetwork
     */
    /*  static async bizDefinition() {
         let self = new this();
         self.businessNetworkDefinition = await self.bizNetworkConnection.connect(self.cardName);
         self.businessNetworkName = self.businessNetworkDefinition.getName();
         return self.businessNetworkDefinition;
     } */

    async bizDefinition() {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(this.cardName);
        this.businessNetworkName = this.businessNetworkDefinition.getName();
        return this.businessNetworkDefinition;
    }
    async assetRegistry(type) {
        return await this.bizNetworkConnection.getAssetRegistry(`${this.namespace}.${type}`)

    }
    async participantRegistry(type) {
        return await this.bizNetworkConnection.getParticipantRegistry(`${this.namespace}.${type}`)

    }
    factorySerializer() {
        let factory = this.bizNetworkConnection.getBusinessNetwork().getFactory()
        let serializer = this.businessNetworkDefinition.getSerializer();
        return {
            factory,
            serializer
        }
    }

}
module.exports = MyNetwork;