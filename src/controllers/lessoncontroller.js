const Chapter = require("../models/Chapter");
const Lesson = require("../models/Lesson");
const createLesson = async (req, res) => {
    try {
        const { title, content, chapter, order } = req.body;
            const chapterExists = await Chapter.findById(chapter);
            if (!chapterExists){
              return res.status(404).json({
                message:"chapter not found"
              });
            }
        const lesson = await Lesson.create({
            title,
            content,
            chapter,
            order
        });
        res.status(201).json({
            message: "Lesson created successfully",
            lesson
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create lesson",
        });
    }
};
const getLessonsByChapter = async (req, res) => {
    try {
        const lessons = await Lesson.find({
            chapter: req.params.chapterId
        }).sort({ order: 1 });

        res.status(200).json(lessons);
    } catch (error) {
        res.status(400).json({
            message: "Failed to get lessons",
        });
    }
};
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        res.status(200).json(lesson);
    } catch (error) {
        res.status(400).json({
            message: "Failed to get lesson",
        });
    }
};
const updateLesson = async (req, res) => {
    try {
        const { title, content, chapter, order } = req.body;
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (chapter !== undefined){
    const chapterExists = await Chapter.findById(chapter);
    if (!chapterExists) {
        return res.status(400).json({
            message: "Chapter not found"
        });
    }
    updateData.chapter = chapter;
        }
        if (order !== undefined) updateData.order = order;
        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
        if (!lesson) {
            return res.status(400).json({
                message: "Lesson not found"
            });
        }
        res.status(200).json({
            message: "Lesson updated successfully",
            lesson
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update lesson",
        });
    }
};
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);

        if (!lesson) {
            return res.status(400).json({
                message: "Lesson not found"
            });
        }
        res.status(200).json({
            message: "Lesson deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete lesson",
        });
    }
};
module.exports = {
    createLesson,
    getLessonsByChapter,
    getLessonById,
    updateLesson,
    deleteLesson
};