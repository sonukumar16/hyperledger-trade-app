const {
    MyNetwork
} = require('../../lib');
const autoBind = require('auto-bind');
class AssetMethods {
    constructor() {
        this.registry;
        this.factory;
        this.serializer;
        this.namespace = MyNetwork.namespace;
        this.type = 'Commodity';
        this.traderRelationType = 'Trader'
        autoBind(this)
    }
    
    /**
     * Create an asset
     *
     * @param {*String} tradingSymbol , Id of asset to be added
     * @param {*Object} data, data is assets model data.
     * @returns {*Object} , return promise object of asset
     * 
     */
    async createAsset({tradingSymbol /* id */, ...data}) {
        this.registry = await MyNetwork.assetRegistry(this.type);  
        let {factory, serializer} = MyNetwork.factorySerializer(); 
        this.factory = factory;
        this.serializer = serializer
        /* newRelationship
                Relationship newRelationship( string ns, string type, string id )
         */
        let owner = factory.newRelationship(`${this.namespace}`, this.traderRelationType, data.owner);        
        data.owner = owner;

        let asset = Object.assign(factory.newResource(`${this.namespace}`, this.type, tradingSymbol /* id */), data);       
        let addAssetsResponse = await this.registry.add(asset);
        return addAssetsResponse ? addAssetsResponse: asset;       
    }

    /**
     * get all assets (Commodity)
     *
     * @returns {*Array}, return promise array of objects of assets  
     * 
     */
    async getAllAssets () {       
            console.info(':::::::::::::::::::: Begin to get assets ::::::::::::::::::::::::::::');
            
            let allAssets = await this.registry.getAll();
            console.info(`Find ${allAssets.length} bikes`);
            allAssets.forEach(asset => {
            console.info('Asset: ', asset.id, asset.getFullyQualifiedIdentifier());
            });
            console.info(':::::::::::::::::::: End get assets ::::::::::::::::::::::::::::');
            return allAssets;    
    }
}
module.exports = AssetMethods;