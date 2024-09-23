const Review = require('../db/models/attra-review-schema');

// Get all reviews for a specific attraction
exports.getReviewsForAttraction = async (req, res) => {
  try {
    const reviews = await Review.find({
      attraction: req.params.attractionId,
    }).populate('user', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new review
module.exports.postReviewForAttraction = async (req, res) => {
  try {
    const { attraction, user, rating, comment } = req.body;

    // Create a new review
    const newReview = new Review({
      attraction,
      user,
      rating,
      comment,
      image: req.file ? req.file.path : null, // Get the image path from Multer
    });

    // Save the review to the database
    await newReview.save();

    // Respond with the created review
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateReviewForAttraction = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, attraction, rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        attraction,
        user,
        rating,
        comment,
        image: req.file ? req.file.path : null,
      },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteReviewForAttraction = async (req, res) => {
  try {
    const { id } = req.params; // Get the review ID from the request parameters

    // Find the review by ID and delete it
    const deletedReview = await Review.findByIdAndDelete(id);

    // Check if the review was found and deleted
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: error.message });
  }
};
