const router = require('express').Router();
const {
    Ctrl
} = require('../modules/participant');

router.route('/')
    .post(Ctrl.add)
/* .get(Ctrl.get)
.put(Ctrl.update)
.delete(Ctrl.delete) */
;

router.route('/testConnection')
    .post(Ctrl.testConnection);

router.route('/identity')
        .get(Ctrl.identityList)

    

module.exports = router;