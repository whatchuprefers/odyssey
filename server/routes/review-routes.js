const express = require('express');
const router = express.Router();
const controllers = require('../controllers/review-controllers');
const upload = require('../middlewares/uploads');
const checkToken = require('../middlewares/checkToken');

router.get('/', checkToken(['ACCOMODATION', 'USER']), controllers.getReview);
router.post('/', upload.single('image'), controllers.postReview);

module.exports = router;
