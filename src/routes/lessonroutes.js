const express = require("express");
const {
    createLesson,
    getLessonsByChapter,
    getLessonById,
    updateLesson,
    deleteLesson
} = require("../controllers/lessoncontroller");
const { protect,isAdmin} =require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", createLesson);

router.get("/chapter/:chapterId", getLessonsByChapter);

router.get("/:id", getLessonById);

router.patch("/:id", updateLesson);

router.delete("/:id", deleteLesson);

module.exports = router;