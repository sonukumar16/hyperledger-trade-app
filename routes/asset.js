const router = require('express').Router();
const {Ctrl} = require('../modules/asset');

router.route('/')
    .post(Ctrl.addAsset)
    /* .get(Ctrl.listAssets)
    .put(Ctrl.update)
    .delete(Ctrl.delete) */

module.exports = router;