const express = require("express");
const router = express.Router();
const studentController = require("./../controller/studentController");

router.get("/home", studentController.view);
router.get("/adduser",studentController.adduser);
router.post("/adduser",studentController.formsave)
router.get("/edituser/:id",studentController.edituser)
router.post("/edituser/:id",studentController.editpost)
router.get("/deleteuser/:id",studentController.delete)


module.exports = router;
