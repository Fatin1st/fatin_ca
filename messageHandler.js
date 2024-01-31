const { workerData, parentPort } = require("worker_threads");
const CharacterAI = require("node_characterai");

const { userId, userMessage, characterAIConfig, createNewBot } = workerData;

let characterAI;

async function createGuestAccount() {
  characterAI = new CharacterAI(characterAIConfig);
  await characterAI.authenticateAsGuest();
  console.log("CharacterAI authenticated sucessfully for ", userId);
}

async function handleUserMessage(userMessage) {
  try {
    const characterId = "s3kGJkdd9nW1-I0HVrH0r3zY3N6TzgPU9WnSRjRLXnM";
    const chat = await characterAI.createOrContinueChat(characterId);

    const response = await chat.sendAndAwaitResponse(userMessage, true);

    return response;
  } catch (error) {
    console.error(error);
    parentPort.postMessage({ error: "Internal Server Error" });
  }
}

// Start by creating a guest account
createGuestAccount().then(() => {
  // Listen for messages from the main thread
  parentPort.on("message", async (message) => {
    // Handle the user message
    try {
      const response = await handleUserMessage(message.userMessage);
      parentPort.postMessage({ userId, response: response.text });
    } catch (error) {
      console.error(error);
      parentPort.postMessage({ userId, error: "Internal Server Error" });
    }
  });
});
