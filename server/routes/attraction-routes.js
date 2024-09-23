const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attraction-controllers');
const upload = require('../middlewares/uploads');

// Attraction routes
router.get('/', attractionController.getAttractions);
router.get('/:id', attractionController.getAttractionById);
router.post('/', upload.single('image'), attractionController.createAttraction);
router.put(
  '/:id',
  upload.single('image'),
  attractionController.updateAttraction
);
router.delete('/:id', attractionController.deleteAttraction);

module.exports = router;
