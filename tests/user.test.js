const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");
const {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  setupDatabase,
  firstTask,
  secondTasks,
  thirdTask,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "James",
      email: "myerscaper73@gmail.com",
      password: "mypass3333!",
    })
    .expect(201);

  //Alert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "James",
      email: "myesrcaper73@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("Mypass7777!");
});

test("Should log in existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login existent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotth3pass",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for not auth", async () => {
  await request(app).delete("/user/me").send().expect(401);
});

// For testing image attaching

// test("should upload avatar image", async () => {
//   await request(app)
//     .post("/user/me/avatar")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .attach("avatar", "tests/fixtures/profile-pic.jpg")
//     .expect(200);
//   const user = await User.findById(userOneId);
//   expect(user.avatar).toEqual(expect.any(buffer));
// });

test("should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "John",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("John");
});

test("should not update fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "New York",
    })
    .expect(400);
});
