const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true
        },
        order: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Lesson", lessonSchema);