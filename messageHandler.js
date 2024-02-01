const { workerData, parentPort } = require("worker_threads");
const CharacterAI = require("node_characterai");

const { userId, characterAIConfig } = workerData;

let characterAI;

const reset = "\x1b[0m";
const magenta = "\x1b[35m";
const bright = "\x1b[1m";

async function createGuestAccount() {
  try {
    characterAI = new CharacterAI(characterAIConfig);
    await characterAI.authenticateAsGuest();
    console.log(
      `${magenta}${bright}[fatin_ca] Created new chat for USER-ID: ${userId}${reset}`
    );
  } catch (error) {
    if (error.message.includes("Could not find Chrome")) {
      // Handle the specific Chrome not found error
      console.error(
        "[fatin_ca] Error: Chrome not found. Please try running `npx puppeteer browsers install chrome`"
      );
    } else {
      console.error(error);
    }

    parentPort.postMessage({ userId, error: "Chrome not being found" });
  }
}

async function handleUserMessage(userMessage, characterId) {
  try {
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
      const response = await handleUserMessage(
        message.userMessage,
        message.characterId
      );
      parentPort.postMessage({ userId, response: response.text });
    } catch (error) {
      console.error(error);
      parentPort.postMessage({ userId, error: "Internal Server Error" });
    }
  });
});
