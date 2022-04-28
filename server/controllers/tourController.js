const mongoose = require('mongoose')
const TourModel = require('../models/Tour');

const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new TourModel({
        ...tour,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    })
    try {
        await newTour.save();
        return res.status(201).json(newTour);
    }catch (error) {
        return res.status(404).json({message: "Something went wrong!"});
    }
}

const getAllTours = async (req, res) => {
    try {
        const tours = await TourModel.find();
        return res.status(200).json(tours);
    }catch (error) {
        return res.status(404).json({message: "Something went wrong!"});
    }
}

const getTour = async (req, res) => {
    const {id} = req.params;
    try {
        const tour = await TourModel.findById(id);
        return res.status(200).json(tour);
    }catch (error) {
        return res.status(404).json({message: "Something went wrong!"});
    }
}
const getToursByUser = async (req, res) => {
    const {userId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({message: "User does not exist!"});
    }
    try {
        const userTours = await TourModel.find({creator: userId});
        return res.status(200).json(userTours);
    }catch (error) {
        return res.status(404).json({message: "Something went wrong!"});
    }
}



module.exports = {
    createTour,
    getAllTours,
    getTour,
    getToursByUser
}