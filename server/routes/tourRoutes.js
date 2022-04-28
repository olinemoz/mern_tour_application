const {createTour, getAllTours, getTour, getToursByUser} = require("../controllers/tourController");
const auth = require("../middlewares/auth");
const router = require('express').Router();

router.post('/',auth, createTour);
router.get('/', getAllTours);
router.get('/:id', getTour);
router.get('/userTours/:userId',auth, getToursByUser);

module.exports = router;