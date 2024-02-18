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
  callback(threadName);
}

const messageQueue = new Map();

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

  // Enqueue the message and callback
  const messageId = uuid.v4();
  messageQueue.set(messageId, callback);
  existingThread.postMessage({ userMessage, characterId, messageId });

  // Set up the message listener if it hasn't been set up yet
  if (!existingThread.listenerSetUp) {
    existingThread.on("message", (response) => {
      const queuedCallback = messageQueue.get(response.messageId);
      if (queuedCallback) {
        queuedCallback(response);
        messageQueue.delete(response.messageId);
      }
    });
    existingThread.listenerSetUp = true;
  }
}

function deleteChat(userId) {
  const existingThread = threadMap.get(userId);

  if (existingThread) {
    existingThread.terminate();
    threadMap.delete(userId);
    console.log(
      `${red}${bright}[fatin_ca] Deleted chat for USER-ID: ${userId}${reset}`
    );
  }
}

module.exports = {
  createNewChat,
  startOrContinueChat,
  deleteChat,
};
