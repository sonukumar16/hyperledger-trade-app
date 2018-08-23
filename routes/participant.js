const router = require('express').Router();
const {Ctrl} = require('../modules/participant');

router.route('/')
    .post(Ctrl.add)
    /* .get(Ctrl.get)
    .put(Ctrl.update)
    .delete(Ctrl.delete) */

module.exports = router;