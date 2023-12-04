const taskController = require("../../controllers/task");
const { req, res, error, mockTasks, task, addTask } = require("../mocks/mocks");

// Mock the services
const taskServices = require("../../services/taskServices");
const sendResponse = require("../../helpers/sendResponse");

jest.mock("../../services/taskServices", () => {
  const mockedFunctions = {};

  // List of functions you want to mock
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
});
