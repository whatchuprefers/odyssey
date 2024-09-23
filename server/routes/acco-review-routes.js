const express = require('express');
const router = express.Router();
const controllers = require('../controllers/acco-review-controllers');
const upload = require('../middlewares/uploads');
// const checkToken = require('../middlewares/checkToken');

router.get('/', controllers.getReview);
router.post('/', upload.single('image'), controllers.postReview);
router.put('/:id', upload.single('image'), controllers.updateReview);
router.delete('/:id', controllers.deleteReview);

module.exports = router;
