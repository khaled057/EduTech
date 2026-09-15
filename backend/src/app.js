const enrollmentRoutes = require("./routes/enrollmentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

app.use("/api", enrollmentRoutes);
app.use("/api", assignmentRoutes);
