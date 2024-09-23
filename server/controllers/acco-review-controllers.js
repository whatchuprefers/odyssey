const Review = require('../db/models/acco-review-schema');

module.exports.getReview = async (req, res) => {
  const review = await Review.find();
  res.status(200).json({ message: 'Success', data: review });
};

module.exports.postReview = async (req, res) => {
  try {
    const { user, accommodation, rating, comment } = req.body;

    // Create a new review
    const newReview = new Review({
      accommodation,
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

module.exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, accommodation, rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        accommodation,
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

module.exports.deleteReview = async (req, res) => {
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
