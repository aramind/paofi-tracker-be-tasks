const req = {
  params: { params: "mock params" },
  body: "mock body",
};

const res = {
  // status: jest.fn((x) => x),
  status: jest.fn((x) => x),
  json: jest.fn(),
};

const error = {
  error: new Error("Simulated error message"),
};

const task = {
  type: "mock type",
  userId: "1234",
  label: "mock label",
  Metadata: { key1: "value1", key2: "value2" },
};

const addTask = jest.fn(() => Promise.resolve(task));

const mockTasks = [{ taskList: "taskList" }];

module.exports = { req, res, error, mockTasks, task, addTask };
