const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async-wrapper");
const Task = require("../models/Schema");

exports.getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

exports.getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task is there with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

exports.updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task is there with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
exports.deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task is there with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
