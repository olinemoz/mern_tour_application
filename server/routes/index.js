const router = require('express').Router();
const userRoutes = require('./userRoutes')
const tourRoutes = require('./tourRoutes')

router.use("/users",userRoutes);
router.use("/tour",tourRoutes);

module.exports = router;