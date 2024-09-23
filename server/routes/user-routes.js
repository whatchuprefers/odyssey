const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user-controllers');
const upload = require('../middlewares/uploads');
const checkToken = require('../middlewares/checkToken');

router.post('/signup', controllers.signupUser);
router.post('/login', controllers.loginUser);
router.get('/', checkToken(['USER']), controllers.getAllUsers);
router.get('/:id', checkToken(['USER']), controllers.getUserById);
router.put(
  '/:id',
  checkToken(['USER']),
  upload.single('image'),
  controllers.updateUser
);
router.delete('/:id', checkToken(['USER']), controllers.deleteUser);

module.exports = router;
