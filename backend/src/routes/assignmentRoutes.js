const express = require("express");

const {
  getCourseAssignments,
  getAssignment,
  createAssignment,
  // updateAssignment,
  // deleteAssignment,
  submitAssignment,
  getMySubmission,
  getAssignmentSubmissions,
  reviewSubmission,
} = require("../controllers/assignmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Student + Instructor
router.get(
  "/courses/:courseId/assignments",
  authMiddleware,
  getCourseAssignments
);

router.get(
  "/assignments/:assignmentId",
  authMiddleware, 
  getAssignment
);


// Instructor
router.post(
  "/courses/:courseId/assignments",
  authMiddleware,
  roleMiddleware("instructor"), // Is the user logged in? then Is the logged-in user an instructor?
  createAssignment
);

/*router.patch(
  "/assignments/:assignmentId",
  authMiddleware,
  roleMiddleware("instructor"),
  updateAssignment
);

router.delete(
  "/assignments/:assignmentId",
  authMiddleware,
  roleMiddleware("instructor"),
  deleteAssignment
);*/

router.get(
  "/assignments/:assignmentId/submissions",
  authMiddleware,
  roleMiddleware("instructor"),
  getAssignmentSubmissions // how many submissions for an assignment
);

router.patch(
  "/submissions/:submissionId",
  authMiddleware,
  roleMiddleware("instructor"),
  reviewSubmission
);

// Student
router.post(
  "/assignments/:assignmentId/submissions",
  authMiddleware,
  roleMiddleware("student"),
  submitAssignment
);

router.get(
  "/assignments/:assignmentId/submissions/me",
  authMiddleware,
  roleMiddleware("student"),
  getMySubmission
);





module.exports = router;
