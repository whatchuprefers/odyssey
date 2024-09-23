const express = require('express');
const accommodationRoutes = require('./accommodation-routes');
const hostRoutes = require('./host-routes');
const reviewRoutes = require('./acco-review-routes');
const userRoutes = require('./user-routes');
const attractionRoutes = require('./attraction-routes');
const attractionReviewRoutes = require('./attra-review-routes');
const adminRoutes = require('./admin-routes');

const router = express.Router();

router.use('/accommodation', accommodationRoutes);
router.use('/host', hostRoutes);
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);
router.use('/attraction', attractionRoutes);
router.use('/attraction', attractionReviewRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
