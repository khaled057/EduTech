const Chapter = require("../models/Chapter");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const createChapter = async (req, res) => {
  try {
    const { title, course, order } = req.body;
    const courseExists = await Course.findById(course);
    if (!courseExists){
      return res.status(400).json({
        message:"Course not found"
      });
    }
    const chapter = await Chapter.create({
      title,
      course,
      order,
    });
    res.status(201).json({
      message: "Chapter created successfully",
      chapter,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create chapter",
    });
  }
};
const getChaptersByCourse = async (req, res) => {
  try {
    const chapters = await Chapter.find({
      course: req.params.courseId,
    }).sort({ order: 1 });

    res.status(200).json(chapters);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get chapters",
    });
  }
};
const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);

    if (!chapter) {
      return res.status(400).json({
        message: "Chapter not found",
      });
    }

    res.status(200).json(chapter);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get chapter",
      error: error.message,
    });
  }
};
const updateChapter = async (req, res) => {
  try {
    const { title, course, order } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
     {
if (course !== undefined) {
  const courseExists = await Course.findById(course);
  if (!courseExists) {
    return res.status(400).json({
      message: "Course not found",
    });
  }
  updateData.course = course;
}
}
    if (order !== undefined) updateData.order = order;
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!chapter) {
      return res.status(404).json({
        message: "Chapter not found",
      });
    }
    res.status(200).json({
      message: "Chapter updated successfully",
      chapter,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update chapter",
      error: error.message,
    });
  }
};
const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(400).json({
        message: "Chapter not found",
      });
    }
    await Lesson.deleteMany({
      chapter:chapter._id,
    });

    res.status(200).json({
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete chapter",
    });
  }
};
module.exports = {
  createChapter,
  getChaptersByCourse,
  getChapterById,
  updateChapter,
  deleteChapter,
};
