const express = require('express');
const accommodationRoutes = require('./accommodation-routes');
const hostRoutes = require('./host-routes');
const reviewRoutes = require('./review-routes');
const userRoutes = require('./user-routes');

const router = express.Router();

router.use('/accommodation', accommodationRoutes);
router.use('/host', hostRoutes);
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);

module.exports = router;
