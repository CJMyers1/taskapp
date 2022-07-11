const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = mongoose.Types.ObjectID();
const userOne = {
  _id: userOneId,
  name: "mike",
  email: "mike@example.com",
  password: "faefae453",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = mongoose.Types.ObjectID();
const userTwo = {
  _id: userTwoId,
  name: "Joe",
  email: "Joe@example.com",
  password: "FatherImLuke",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const firstTask = {
  _id: new mongoose.Types.ObjectID(),
  description: "First Task",
  completed: false,
  owner: userOne._id,
};

const secondTask = {
  _id: new mongoose.Types.ObjectID(),
  description: "second Task",
  completed: false,
  owner: userOne._id,
};

const thirdTask = {
  _id: new mongoose.Types.ObjectID(),
  description: "third Task",
  completed: false,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(firstTask).save();
  await new Task(secondTask).save();
  await new Task(thirdTask).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  setupDatabase,
  firstTask,
  secondTasks,
  thirdTask,
};
