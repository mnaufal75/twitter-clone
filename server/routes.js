const router = require('express').Router();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const tweetRoute = require('./routes/tweet');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/tweet', tweetRoute);

module.exports = router;
