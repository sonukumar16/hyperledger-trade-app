const Methods = require('./assetMethods');
class AssetCtrl extends Methods {    
    /* Addig AssetRegistry */
    async addAsset(req, res) {
        try {
            let asset = await super.createAsset(req.body);
            console.log("Add asset of Assets Add :::::::::::::::::::::", asset)
            return res.send(asset)
        } catch (err) {
            console.log("Error of Assets Add :::::::::::::::::::::", err)
        }
    }

    /* Accessing AssetRegistry */
    async listAssets(req, res) {
        try {
            let asset = await super.getAllAssets(req.body);
            console.log("Add asset of Assets Add :::::::::::::::::::::", asset)
            return res.send(asset)
        } catch (err) {
            console.log("Error of Assets Add :::::::::::::::::::::", err)
            process.exit(0);
        }
    }

}
module.exports = AssetCtrl;