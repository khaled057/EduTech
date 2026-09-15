const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const Course = require("../models/Course"); // we need to check if this course actually belong to this instructor when an instructor modifies an assignment
const checkEnrollment = require("../middleware/checkEnrollment");


// ==========================================
// GET ASSIGNMENTS
// ==========================================

// GET /api/courses/:courseId/assignments
const getCourseAssignments = async (req, res, next) => { // get available course assignments
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId); // find course first 

    if (!course) {
      return res.status(404).json({ // return and don't continue the rest of the function
        message: "Course not found",
      });
    }

    const assignments = await Assignment.find({ // then find assignments
      course: courseId,
    })
      .populate("lesson", "title")
      .sort({ createdAt: -1 }); // -1 descending (newest assignments first)

    res.status(200).json({
      count: assignments.length, // how many assignments there are.
      assignments, // the actual assignments
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// GET ONE ASSIGNMENT
// ==========================================

// GET /api/assignments/:assignmentId
const getAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(
      req.params.assignmentId
    )
      .populate("course", "title") // retrieve the course title and lesson title.
      .populate("lesson", "title")
      .populate("createdBy", "name");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      assignment,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// CREATE ASSIGNMENT
// ==========================================

// POST /api/courses/:courseId/assignments
const createAssignment = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const {
      lesson,
      title,
      description,
      dueDate,
      maxScore,
    } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Instructor must own the course
    if (course.instructor.toString() !== req.user._id.toString()) { // Is the logged-in instructor actually the instructor of this course?
      return res.status(403).json({ // permission denied
        message: "You can only manage assignments in your own courses",
      });
    }

    const assignment = await Assignment.create({
      course: courseId,
      lesson: lesson || null,
      title,
      description,
      dueDate: dueDate || null,
      maxScore,
      createdBy: req.user._id,
    });

        if (!title || !description || !maxScore) {
      return res.status(400).json({
        message: "Title, description and maxScore are required",
      });
    }

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    next(error);
  }
};

/*
// ==========================================
// UPDATE ASSIGNMENT
// ==========================================

// PATCH /api/assignments/:assignmentId
const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(
      req.params.assignmentId
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const course = await Course.findById(assignment.course);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You cannot edit this assignment",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "lesson",
      "dueDate",
      "maxScore",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        assignment[field] = req.body[field];
      }
    });

    await assignment.save();

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// DELETE ASSIGNMENT
// ==========================================

// DELETE /api/v1/assignments/:assignmentId
const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(
      req.params.assignmentId
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const course = await Course.findById(assignment.course);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You cannot delete this assignment",
      });
    }

    await Assignment.findByIdAndDelete(assignment._id);

    // Optional: remove associated submissions
    await AssignmentSubmission.deleteMany({
      assignment: assignment._id,
    });

    res.status(200).json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
*/

// ==========================================
// STUDENT SUBMISSION
// ==========================================

// POST /api/assignments/:assignmentId/submissions
const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { answer } = req.body;

    if (!answer || !answer.trim()) {
      return res.status(400).json({
        message: "Answer is required",
      });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Verify enrollment
    checkEnrollment();

    // Check existing submission
    const existingSubmission =
      await AssignmentSubmission.findOne({ // Has this student already submitted this assignment?
        assignment: assignmentId,
        student: req.user._id,
      });

    if (existingSubmission) {
      return res.status(409).json({ // Conflict
        message: "You have already submitted this assignment",
      });
    }

    const submission = await AssignmentSubmission.create({
      assignment: assignmentId,
      student: req.user._id,
      answer,
    });

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// STUDENT GET OWN SUBMISSION
// ==========================================

// GET /api/assignments/:assignmentId/submissions/me
const getMySubmission = async (req, res, next) => {
  try {
    const submission = await AssignmentSubmission.findOne({
      assignment: req.params.assignmentId,
      student: req.user._id,
    }).populate("assignment", "title maxScore");

    if (!submission) {
      return res.status(404).json({
        message: "No submission found",
      });
    }

    res.status(200).json({
      submission,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// INSTRUCTOR GET SUBMISSIONS
// ==========================================

// GET /api/assignments/:assignmentId/submissions
const getAssignmentSubmissions = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(
      req.params.assignmentId
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const course = await Course.findById(assignment.course);

    if (
      course.instructor.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({ // permission denied
        message: "You cannot view these submissions",
      });
    }

    const submissions = await AssignmentSubmission.find({ // Instructor views submissions
      assignment: assignment._id,
    })
      .populate("student", "name email")
      .sort({ submittedAt: -1 }); // Newest submissions first.

    res.status(200).json({
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// INSTRUCTOR REVIEW
// ==========================================

// PATCH /api/submissions/:submissionId
const reviewSubmission = async (req, res, next) => {
  try {
    const { score, feedback } = req.body;

    const submission =
      await AssignmentSubmission.findById( // Find the submission and also retrieve the Assignment document.
        req.params.submissionId
      ).populate("assignment"); // we need the assignment document because it has maxScore key.

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    const course = await Course.findById(
      submission.assignment.course
    );

    if (
      course.instructor.toString() !== // Does this instructor own this course?
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You cannot review this submission",
      });
    }

    // Score validation
    if (score !== undefined) {
      if (
        typeof score !== "number" ||
        score < 0 || // The score can't be negative.
        score > submission.assignment.maxScore // The instructor can't give more points than the assignment allows.
      ) {
        return res.status(400).json({
          message: `Score must be between 0 and ${submission.assignment.maxScore}`,
        });
      }

      submission.score = score;
    }

    if (feedback !== undefined) {
      submission.feedback = feedback;
    }

    await submission.save(); // Save the changes to the database

    res.status(200).json({
      message: "Submission reviewed successfully",
      submission,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getCourseAssignments,
  getAssignment,
  createAssignment,
  // updateAssignment,
  // deleteAssignment,
  submitAssignment,
  getMySubmission,
  getAssignmentSubmissions,
  reviewSubmission,
};
