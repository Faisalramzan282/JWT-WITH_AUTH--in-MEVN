const movieModel = require('../models/movies'); // Import your movie model

const getById = async (req, res, next) => {
  try {
    const movieInfo = await movieModel.findById(req.params.movieId);
    res.json({ status: "success", message: "Movie found!!!", data: { movies: movieInfo } });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res) => {
  try {
    const allMovies = await movieModel.find(); // Assuming find() fetches all movies
    res.json(allMovies); // Send the movies data as JSON response
  } catch (error) {
    console.error("errro in get Movies==>", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateById = async (req, res, next) => {
  try {
    await movieModel.findByIdAndUpdate(req.params.movieId, {
      movieName: req.body.movieName,
      releaseDate: req.body.releaseDate
    });
   res.json({ status: "success", message: "Movie updated successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    await movieModel.findByIdAndRemove(req.params.movieId);
    res.json({ status: "success", message: "Movie deleted successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const response = await movieModel.create({movieName: req.body.movieName, releaseDate: req.body.releaseDate, tickets:req.body.tickets, moviePrice: req.body.moviePrice });
    res.json({ status: "success", message: "Movie added successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getById,
  getAll,
  updateById,
  deleteById,
  create
};
