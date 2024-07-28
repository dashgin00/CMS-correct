const { getDoctor, getDoctors } = require('../controllers/adminControllers');
const {reservation} = require('../controllers/usersControllers');
const { verifyLogout } = require('../middlewares/verifyToken');

const router = require('express').Router();

router.get('/doctors', getDoctors)
router.get('/doctor/:id', getDoctor)
router.get('/appointment/:doctorID/:userID', verifyLogout, reservation)

module.exports = router;