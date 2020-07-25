const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const dotenv = require("dotenv");

const projectRoutes = require("./routes/ProjectRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const userRoutes = require("./routes/UserRoutes");
const peopleRoutes = require("./routes/PeopleRoutes");
const reportRoutes = require("./routes/ReportRoutes");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.static("client/build"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/project", projectRoutes);
app.use("/comment", commentRoutes);
app.use("/task", taskRoutes);
app.use("/people", peopleRoutes);
app.use("/user", userRoutes);
app.use("/reports", reportRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
