const {createTour, getAllTours} = require("../controllers/tourController");
const auth = require("../middlewares/auth");
const router = require('express').Router();

router.post('/',auth, createTour);
router.get('/', getAllTours);

module.exports = router;