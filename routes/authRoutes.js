const router = require('express').Router();
const {register, login, logout} = require('../controllers/authControlllers');
const { verifyLogout, verifyLogin } = require('../middlewares/verifyToken');

router.post("/register",verifyLogin, register)
router.post("/login", verifyLogin, login)
router.get("/logout", verifyLogout, logout)

module.exports = router;