// importing the models
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course"); 

// receiving the request for enrollment
const enrollInCourse = async (req, res, next) => { // we use async because database operations take time.
  try {
    const { courseId } = req.params; // Take the courseId property from the req.params object (destructre).
    const studentId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ // 404, because the requested resource doesn't exist.
        message: "Course not found",
      });
    }

    // Check duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({ // 409, because the request conflicts with the current state, The student is trying to create an enrollment that already exists.
        message: "You are already enrolled in this course",
      });
    }

    // Creating the enrollment itself
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({ // 201, because we created a new resource.
      message: "Successfully enrolled in course",
      enrollment,
    });
  } catch (error) {
    next(error);
  }
};

// Get student enrollments 
/*const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
      .populate("course")
      .sort({ enrolledAt: -1 });

    res.status(200).json({
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    next(error);
  }
};*/


module.exports = { enrollInCourse
	//,getMyEnrollments 
	};
