const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // to have fields like createdAt and updatedAt in the Object
  }
);

// Prevent the same student from enrolling twice
enrollmentSchema.index( // compound unique index
  { student: 1, course: 1 }, // 1 means ascending index order
  { unique: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema); // export the schema in a model called "Enrollment"
