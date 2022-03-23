const express = require("express")
const CollegeController = require("../controllers/collegeController")
const InternController = require("../controllers/internController")
const router = express.Router()



router.post("/functionup/colleges", CollegeController.createCollege)

router.post("/functionup/interns",InternController.createIntern)
// router.post("/functionup/interns",InternController.createIntern1)


router.get("/functionup/collegeDetails",CollegeController.collegeDetails)


module.exports = router