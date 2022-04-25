const router = require('express').Router();
const {signup, signin, googleSignIn} = require("../controllers/userController");

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/googleSignIn', googleSignIn);

module.exports = router