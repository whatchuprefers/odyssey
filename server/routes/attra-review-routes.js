const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/attra-review-controllers');
const upload = require('../middlewares/uploads');

// Review routes
router.get('/:attractionId/reviews', reviewController.getReviewsForAttraction);
router.post(
  '/:attractionId/reviews',
  upload.single('image'),
  reviewController.postReviewForAttraction
);
router.put(
  '/:attractionId/reviews/:id',
  upload.single('image'),
  reviewController.updateReviewForAttraction
);
router.delete(
  '/:attractionId/reviews/:id',
  reviewController.deleteReviewForAttraction
);

module.exports = router;
