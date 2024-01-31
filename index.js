// fatin_ca/index.js

const { Worker } = require("worker_threads");
const uuid = require("uuid");
const path = require("path");

const threadMap = new Map();

function createNewChat(userId, callback) {
  const threadName = `userThread__${uuid.v4()}`;

  const worker = new Worker(path.join(__dirname, "messageHandler.js"), {
    workerData: {
      userId,
      characterAIConfig: {},
    },
    name: threadName,
  });

  threadMap.set(userId, worker);
  worker.removeAllListeners("message");
  callback(threadName);
}

function continueChat(userId, userMessage, callback) {
  const existingThread = threadMap.get(userId);

  if (!existingThread) {
    throw new Error("Thread not found");
  }

  existingThread.postMessage({ userMessage });

  existingThread.on("message", (response) => {
    callback(response);
    existingThread.removeAllListeners("message");
  });
}

module.exports = {
  createNewChat,
  continueChat,
};
