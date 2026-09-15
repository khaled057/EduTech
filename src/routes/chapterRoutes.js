const express = require("express");
const {
    createChapter,
    getChaptersByCourse,
    getChapterById,
    updateChapter,
    deleteChapter
} = require("../controllers/chaptercontroller");
const { protect,isAdmin} =require("../middleware/authmiddleware");
const router = express.Router();
router.post("/", createChapter);

router.get("/course/:courseId", getChaptersByCourse);

router.get("/:id", getChapterById);

router.patch("/:id", updateChapter);

router.delete("/:id", deleteChapter);

module.exports = router;