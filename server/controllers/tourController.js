const TourModel = require('../models/Tour');

const createTour = async (req, res) => {
    const tour = req.body;
    console.log("Req userId",req.userId)
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

module.exports = {
    createTour,
    getAllTours
}