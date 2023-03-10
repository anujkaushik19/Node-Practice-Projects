const express = require("express");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();
const mongoose = require("mongoose");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port 3000...`));
  } catch (error) {
    console.log(error);
  }
};
start();
