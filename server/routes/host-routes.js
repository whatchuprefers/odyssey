const express = require('express');
const router = express.Router();
const hostController = require('../controllers/host-controllers');
const checkToken = require('../middlewares/checkToken');

router.post('/signup', hostController.signupHost);
router.post('/login', hostController.loginHost);
router.post('/', hostController.createHost);
router.get('/', hostController.getAllHosts);
router.get('/:id', checkToken(['HOST']), hostController.getHostById);
router.put('/:id', checkToken(['HOST']), hostController.updateHost);
router.put('/:id/password', checkToken(['HOST']), hostController.resetPassword);
router.delete('/:id', checkToken(['HOST']), hostController.deleteHost);
router.get(
  '/:id/accommodation',
  checkToken(['HOST']),
  hostController.getAccommodationsByHost
);

module.exports = router;
