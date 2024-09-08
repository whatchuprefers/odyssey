const express = require('express');
const router = express.Router();
const hostController = require('../controllers/host-controllers');

router.post('/signup', hostController.signupHost);
router.post('/login', hostController.loginHost);
router.post('/', hostController.createHost);
router.get('/', hostController.getAllHosts);
router.get('/:id', hostController.getHostById);
router.put('/:id', hostController.updateHost);
router.delete('/:id', hostController.deleteHost);
router.get('/:id/accommodation', hostController.getAccommodationsForHost);

module.exports = router;
