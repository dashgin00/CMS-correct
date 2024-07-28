const router = require("express").Router();
const {
  getDoctors,
  getDoctor,
  createDoctor,
  deleteDoctor,
  deleteReserveDoctorSession,
  reserveDoctorSession,
} = require("../controllers/adminControllers");
const { verifyAdmin } = require("../middlewares/verifyToken");

router.get("/doctors", getDoctors);
router.get("/doctors/:id", getDoctor);
router.post("/doctors", verifyAdmin, createDoctor);
router.delete("/doctors/:id", verifyAdmin, deleteDoctor);
router.delete("/appointment/:doctorID/:userID", verifyAdmin, deleteReserveDoctorSession);
router.get("/appointment/:doctorID/:userID", verifyAdmin, reserveDoctorSession);

module.exports = router;
