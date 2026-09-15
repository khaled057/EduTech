const express = require("express");

const {
  enrollInCourse,
  //getMyEnrollments,
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post( // send enrollment
  "/courses/:courseId/enroll",
  authMiddleware,
  roleMiddleware("student"),
  enrollInCourse
);

/*router.get( // student's enrollments
  "/enrollments/me",
  authMiddleware,
  roleMiddleware("student"),
  getMyEnrollments
);*/

module.exports = router;
