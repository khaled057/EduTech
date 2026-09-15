const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true, // removes unnecessary spaces around the text.
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: { // deadline
      type: Date,
      default: null,
    },

    maxScore: {
      type: Number,
      required: true,
      min: 1,
    },

    createdBy: { // stores which instructor created the assignment.
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
