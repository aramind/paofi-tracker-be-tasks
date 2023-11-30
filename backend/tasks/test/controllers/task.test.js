const taskController = require("../../controllers/task");
const Task = require("../../models/Task");

jest.mock("../../models/Task");

const fakeReq = {
  params: { userId: "some userId" },
  body: "fake body",
};

const fakeRes = {
  status: jest.fn((x) => x),
  json: jest.fn(),
};

const fakeTasks = [{ taskList: "taskList" }];

it("should send a status code 404 when no tasks were found", async () => {
  Task.find.mockResolvedValueOnce([]);
  await taskController.getTaskByUserId(fakeReq, fakeRes);
  expect(fakeRes.status).toHaveBeenCalledWith(404);
});

it("should send a response with success set to false when no tasks were found", async () => {
  Task.find.mockResolvedValueOnce([]);
  await taskController.getTaskByUserId(fakeReq, fakeRes);
  expect(fakeRes.json).toHaveBeenCalledWith(
    expect.objectContaining({
      success: false,
    })
  );
});

it("should send a status code 200 when no tasks were found", async () => {
  Task.find.mockResolvedValueOnce(fakeTasks);
  await taskController.getTaskByUserId(fakeReq, fakeRes);
  expect(fakeRes.status).toHaveBeenCalledWith(200);
});

it("should send a response with success set to true when tasks were found", async () => {
  Task.find.mockResolvedValueOnce(fakeTasks);
  await taskController.getTaskByUserId(fakeReq, fakeRes);
  expect(fakeRes.json).toHaveBeenCalledWith(
    expect.objectContaining({
      success: true,
    })
  );
});

it("should send the retrieved tasks as data when tasks were found", async () => {
  Task.find.mockResolvedValueOnce(fakeTasks);
  await taskController.getTaskByUserId(fakeReq, fakeRes);
  expect(fakeRes.json).toHaveBeenCalledWith(
    expect.objectContaining({
      data: fakeTasks,
    })
  );
});
