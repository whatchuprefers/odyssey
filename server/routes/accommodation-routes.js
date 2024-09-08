const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodation-controllers');
const upload = require('../middlewares/uploads');
const checkToken = require('../middlewares/checkToken');

// router.get(
//   '/',
//   checkToken(['ACCOMMODATION', 'USER']),
//   controllers.getAccommodation
// );
// router.post('/', upload.single('image'), controllers.postAccommodation);

router.post(
  '/',
  upload.single('image'),
  accommodationController.createAccommodation
);
router.get('/', accommodationController.getAllAccommodations);
router.get('/:id', accommodationController.getAccommodationById);
router.put(
  '/:id',
  upload.single('image'),
  accommodationController.updateAccommodation
);
router.delete('/:id', accommodationController.deleteAccommodation);

module.exports = router;
