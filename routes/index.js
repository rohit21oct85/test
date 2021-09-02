const express = require('express');
const router =  express.Router();
router.use(require('./admin/index'));
router.use(require('./client/index'));
router.use(require('./desktop/index'));

module.exports = router;
