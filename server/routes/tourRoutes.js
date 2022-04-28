const {createTour, getAllTours, getTour} = require("../controllers/tourController");
const auth = require("../middlewares/auth");
const router = require('express').Router();

router.post('/',auth, createTour);
router.get('/', getAllTours);
router.get('/:id', getTour);

module.exports = router;