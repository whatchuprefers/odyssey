const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user-controllers');
const upload = require('../middlewares/uploads');
const checkToken = require('../middlewares/checkToken');

router.post('/signup', controllers.signupUser);
router.post('/login', controllers.loginUser);
router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);
router.put(
  '/:id',

  controllers.updateUser
);
router.delete('/:id', checkToken(['USER']), controllers.deleteUser);

module.exports = router;
