const express = require("express");
const userRoutes = require("./routes/userroutes");
const lessonRoutes = require("./routes/lessonroutes");
const chapterRoutes = require("./routes/chapterRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authroutes = require( "./routes/authroutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API is running"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth",  authroutes);

module.exports = app;