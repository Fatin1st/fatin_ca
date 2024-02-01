const { Worker } = require("worker_threads");
const uuid = require("uuid");
const path = require("path");

const reset = "\x1b[0m";
const red = "\x1b[31m";
const bright = "\x1b[1m";

const threadMap = new Map();

function createNewChat(userId, callback) {
  if (!userId) {
    throw new Error("[fatin_ca] createNewChat: Missing ´userId´ argument");
  }

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

function startOrContinueChat(userId, userMessage, characterId, callback) {
  if (!userId || !userMessage || !characterId) {
    throw new Error(
      "[fatin_ca] startOrContinueChat: Missing required arguments"
    );
  }

  const existingThread = threadMap.get(userId);

  if (!existingThread) {
    throw new Error("Thread not found");
  }

  existingThread.postMessage({ userMessage, characterId });

  existingThread.on("message", (response) => {
    callback(response);
    existingThread.removeAllListeners("message");
  });
}

function deleteChat(userId) {
  const existingThread = threadMap.get(userId);

  if (existingThread) {
    existingThread.terminate();
    threadMap.delete(userId);
    console.log(
      `${red}${bright}[fatin_ca] Deleted chat for USERID: ${userId}${reset}`
    );
  }
}

module.exports = {
  createNewChat,
  startOrContinueChat,
  deleteChat,
};
