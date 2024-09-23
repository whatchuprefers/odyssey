const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads');
const checkToken = require('../middlewares/checkToken');
const adminController = require('../controllers/admin-controllers');

// Admin Routes
router.post('/signup', adminController.signupAdmin);
router.post('/login', adminController.loginAdmin);

// User Routes
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

// Accommodation Routes
router.get('/accommodations', adminController.getAllAccommodations);
router.delete('/accommodations/:id', adminController.deleteAccommodation);

// Attraction Routes
router.get('/attractions', adminController.getAllAttractions);
router.post(
  '/attractions',
  upload.single('image'),
  adminController.addAttraction
);
router.put(
  '/attractions/:id',
  upload.single('image'),
  adminController.updateAttraction
);
router.delete('/attractions/:id', adminController.deleteAttraction);

module.exports = router;
