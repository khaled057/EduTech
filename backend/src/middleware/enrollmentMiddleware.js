// This prevents a student from accessing course content when they haven't enrolled.

const Enrollment = require("../models/Enrollment");

const checkEnrollment = async (req, res, next) => { // check if student is enrolled in course
  try {
    const studentId = req.user._id;

    // courseId can come from different routes
    const { courseId } = req.params; // Take the courseId property from the req.params object (destructre).

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    const enrollment = await Enrollment.findOne({ // check the enrollment data
      student: studentId,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({ // 403, due to lack of permission
        message: "You are not enrolled in this course",
      });
    }

    req.enrollment = enrollment;

    next(); // continue to the next middleware/controller in the route chain
  } catch (error) {
    next(error);
  }
};

module.exports = checkEnrollment;
