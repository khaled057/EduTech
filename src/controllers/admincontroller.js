const User = require("../models/User");
const Course = require("../models/Course");
const Chapter = require("../models/Chapter");
const Lesson = require("../models/Lesson");
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get users",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateData = {};
    if (name != undefined) updateData.name = name;
    if (email != undefined) updateData.email = email;
    if (role != undefined) updateData.role = role;
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete user",
    });
  }
};
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get courses",
    });
  }
};
const updateCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const updateData = {};
    if (title != undefined) updateData.title = title;
    if (description != undefined) updateData.description = description;
    if (instructor != undefined) updateData.instructor = instructor;
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("instructor", "name email");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    res.status(200).json({
      message: "Course updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update course",
    });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    const chapters = await Chapter.find({
      course: course._id,
    }).select("_id");
    const chapterIds = chapters.map((chapter) => chapter._id)
    await Lesson.deleteMany({
      chapter: { $in: chapterIds },
    });
    await Chapter.deleteMany({
      course: course._id,
    });
    res.status(200).json({
      message: "Course and its content deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete course",
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
      chapter: chapter._id,
    });

    res.status(200).json({
      message: "Chapter and its lessons deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete chapter",
    });
  }
};
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    res.status(200).json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete lesson",
    });
  }
};
module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getCourses,
  updateCourse,
  deleteCourse,
  deleteChapter,
  deleteLesson,
};
