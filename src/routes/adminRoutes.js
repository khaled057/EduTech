const express = require("express");
const {
  getUsers,
  updateUser,
  deleteUser,
  getCourses,
  updateCourse,
  deleteCourse,
  deleteChapter,
  deleteLesson,
} = require("../controllers/admincontroller");
const { protect,isAdmin} =require("../middleware/authmiddleware");
const router = express.Router();
router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/courses", getCourses);
router.patch("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse); 
router.delete("/chapters/:id", deleteChapter);
router.delete("/lessons/:id", deleteLesson);

module.exports = router;
