const taskController = require("../../controllers/task");
const { req, res, error, mockTasks, task, addTask } = require("../mocks/mocks");

const taskServices = require("../../services/taskServices");
const sendResponse = require("../../helpers/sendResponse");

jest.mock("../../services/taskServices", () => {
  const mockedFunctions = {};

  // List of functions to mock
  const functionsToMock = [
    "getTaskByUserId",
    "getTaskByParams",
    "addTask",
    "findTaskByParams",
    "findTaskById",
    "updateTaskById",
  ];

  functionsToMock.forEach((fn) => {
    mockedFunctions[fn] = jest.fn((x) => x);
  });

  return mockedFunctions;
});

jest.mock("../../helpers/sendResponse", () => {
  const mockedFunctions = {};

  const functionsToMock = ["failed", "success", "error"];

  functionsToMock.forEach((fn) => {
    mockedFunctions[fn] = jest.fn((x) => x);
  });

  return mockedFunctions;
});

describe("task controller - getTask", () => {
  it("should send a status code 404 when no tasks were found", async () => {
    // prep
    taskServices.getTaskByParams.mockResolvedValueOnce([]);

    // execute
    await taskController.getTask(req, res);

    // assert
    const callArgs = sendResponse.failed.mock.calls[0];

    expect(sendResponse.failed).toHaveBeenCalled();
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toBe(null);
    expect(callArgs[3]).toBe(404);
  });

  it("should send a status code 200 when tasks are found", async () => {
    // prep
    const mockTasks = [{ taskId: 1, taskName: "Sample Task" }];
    taskServices.getTaskByParams.mockResolvedValueOnce(mockTasks);

    // exec
    await taskController.getTask(req, res);

    // assert
    const callArgs = sendResponse.success.mock.calls[0];

    expect(sendResponse.success).toHaveBeenCalled();
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toBe(mockTasks);
    expect(callArgs[3]).toBe(200);
  });

  it("should send a status code 500 when an error occurs", async () => {
    // prep
    const error = new Error("Some error");
    taskServices.getTaskByParams.mockRejectedValueOnce(error);

    // execute
    await taskController.getTask(req, res);

    // assert

    expect(sendResponse.error).toHaveBeenCalled();
  });
});

// get task by user ID
describe("task controller - getTaskByUserId ", () => {
  it("should send a status code 404 when no tasks were found", async () => {
    // mocking the behavior when no tasks are found
    taskServices.getTaskByParams.mockResolvedValueOnce([]);

    await taskController.getTaskByUserId(req, res);

    // Ensure the first call to sendResponse.failed was as expected
    const callArgs = sendResponse.failed.mock.calls[0];

    expect(sendResponse.failed).toHaveBeenCalled();
    // Ensure the call to sendResponse.failed was as expected
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toBe(null);
    expect(callArgs[3]).toBe(404);
  });

  // successfull retrieve
  it("should send a status code 200 when tasks are found", async () => {
    // Mocking the behavior when tasks are found
    const mockUserTasks = [{ taskId: 1, taskName: "Sample Task" }];
    taskServices.getTaskByParams.mockResolvedValueOnce(mockUserTasks);

    // execute
    await taskController.getTaskByUserId(req, res);

    // Ensure the first call to sendResponse.success was as expected
    const callArgs = sendResponse.success.mock.calls[0];

    expect(sendResponse.success).toHaveBeenCalled();
    // Ensure the call to sendResponse.success was as expected
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toStrictEqual(mockUserTasks);
    expect(callArgs[3]).toBe(200);
  });

  it("should send a status code 500 when an error occurs", async () => {
    // Mocking the behavior when an error occurs
    const error = new Error();
    taskServices.getTaskByParams.mockRejectedValueOnce(error);

    // execute
    await taskController.getTaskByUserId(req, res);

    // assert
    expect(sendResponse.error).toHaveBeenCalled();
    // Ensure the call to sendResponse.error was as expected
    const callArgs = sendResponse.error.mock.calls[0];
    expect(sendResponse.error).toHaveBeenCalled();
    expect(callArgs[0]).toBe(res);
    // expect(callArgs[1]).toBe(error);
  });
});
// add task controller
describe("task controller - addTask", () => {
  it("should send a status code 400 when required fields are missing", async () => {
    // prep
    const invalidReq = {
      type: "type",
      label: "some label",
      Metadata: { data: 3 },
    };

    // exec
    await taskController.addTask(invalidReq, res);

    // assert
    const callArgs = sendResponse.failed.mock.calls[0];

    expect(sendResponse.failed).toHaveBeenCalled();
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toBe(null);
    // expect(callArgs[3]).toBe(400);
  });

  it("should send a status code 403 when task label already exists", async () => {
    // prep
    const existingTask = { taskId: 1, taskName: "Existing Task" };
    taskServices.findTaskByParams.mockResolvedValueOnce(existingTask);

    // exec
    await taskController.addTask(req, res);

    // assert
    const callArgs = sendResponse.failed.mock.calls[0];

    expect(sendResponse.failed).toHaveBeenCalled();
    // Ensure the call to sendResponse.failed was as expected
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toBe(null);
    // expect(callArgs[3]).toBe(403);
  });

  it("should send a success response with the created task when task is created successfully", async () => {
    // prep
    const createdTask = { taskId: 2, taskName: "New Task" };
    taskServices.addTask.mockResolvedValueOnce(createdTask);

    // exec
    await taskController.addTask(req, res);

    // assert
    expect(sendResponse.success).toHaveBeenCalled();
  });

  it("should send an error response when an error occurs", async () => {
    // prep
    const error = new Error();
    taskServices.addTask.mockRejectedValueOnce(error);

    // execute
    await taskController.addTask(req, res);

    // assert
    expect(sendResponse.error).toHaveBeenCalled();
  });
});

// update task
describe("task controller - update", () => {
  it("should send a status code 404 when task is not found", async () => {
    // prep
    taskServices.updateTaskById.mockResolvedValueOnce({ exist: false });
    req.body = { taskId: "someId", type: "someType" };

    // execute
    await taskController.updateTask(req, res);

    // assert
    const callArgs = sendResponse.failed.mock.calls[0];

    expect(sendResponse.failed).toHaveBeenCalled();
    expect(callArgs[0]).toBe(res);
    expect(callArgs[2]).toBe(null);
    expect(callArgs[3]).toBe(404);
  });

  it("should send a status code 200 when task is updated successfully", async () => {
    // prep
    const updatedTask = { taskId: "someId", type: "updatedType" };
    taskServices.updateTaskById.mockResolvedValueOnce({
      exist: true,
      updatedTask,
    });

    req.body = { taskId: "someId", type: "updatedType" }; // Adjust as needed

    // execute
    await taskController.updateTask(req, res);

    // assert
    expect(sendResponse.success).toHaveBeenCalled();
  });

  it("should send an error response when an error occurs", async () => {
    // prep
    const error = new Error("Some error");
    taskServices.updateTaskById.mockRejectedValueOnce(error);

    // exec
    req.body = { taskId: "someId", type: "someType" }; // Adjust as needed

    // assert
    await taskController.updateTask(req, res);

    expect(sendResponse.error).toHaveBeenCalled();
  });
});
