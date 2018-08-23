const router = require('express').Router();
const {Ctrl} = require('../modules/transaction');

router.route('/')
    .post(Ctrl.create)
    /* .get(Ctrl.get)
    .put(Ctrl.update)
    .delete(Ctrl.delete) */

module.exports = router;