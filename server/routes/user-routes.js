const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user-controllers');
// const upload = require('../middlewares/uploads');
// const checkToken = require('../middlewares/checkToken');

router.post('/signup', controllers.signupUser);
router.post('/login');

module.exports = router;
