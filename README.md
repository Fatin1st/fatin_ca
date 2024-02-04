# fatin_ca - Character AI Unofficial API for Mass Usage
## https://github.com/Fatin1st/fatin_ca

fatin_ca is a Node.js module for character.ai, built for Mass Usage and unlimited user handling. It is inspired by the `node_characterai` module, designed to provide a simplified interface for creating and managing chat threads with CharacterAI. One of its key features is the ability to handle mass usage and support unlimited users seamlessly.

## Installation

To install the fatin_ca module, use the following command:

```bash
npm install fatin_ca
npx fatin_ca init
```

## Usage

Here's an example code snippet demonstrating how to use the fatin_ca module:

```javascript
const fatin = require("fatin_ca");

const userId1 = "2009-09-27";
const userId2 = "2009-09-28";
const characterId = "8_1NyR8w1dOXmI1uWaieQcd147hecbdIK7CeEAIrdJw";

// Create new chat for User 1
fatin.createNewChat(userId1, (threadName) => {
  console.log(`Thread Name for User 1: ${threadName}`);
});

// Create new chat for User 1
fatin.createNewChat(userId2, (threadName) => {
  console.log(`Thread Name for User 2: ${threadName}`);
});

// Start chat for User 1
fatin.startOrContinueChat(userId1, "Hello from User 1", characterId, (response) => {
  console.log(`Response for User 1: ${JSON.stringify(response)}`);
});

// Start chat for User 2
fatin.startOrContinueChat(userId2, "Hello from User 2", characterId, (response) => {
  console.log(`Response for User 2: ${JSON.stringify(response)}`);
});


// Continue chat for User 1
fatin.startOrContinueChat(userId1, "How are you?", characterId, (response) => {
  console.log(`Response for User 1: ${JSON.stringify(response)}`);
  fatin.deleteChat(userId1); // Delete chat for User 1
});

// Continue chat for User 2
fatin.startOrContinueChat(userId2, "Who are you?", characterId, (response) => {
  console.log(`Response for User 2: ${JSON.stringify(response)}`);
  fatin.deleteChat(userId2); // Delete chat for User 2
});
```

## Finding your character's ID

You can find your character ID in the URL of a Character's chat page.

For example, if you go to the chat page of the character `Discord Moderator` you will see the URL `https://beta.character.ai/chat?char=8_1NyR8w1dOXmI1uWaieQcd147hecbdIK7CeEAIrdJw`.

The last part of the URL is the character ID:
![Character_ID](https://camo.githubusercontent.com/7553889b98714baa1b79f60a180286fa4da7d2e6237bc19d3e8938e037e924d9/68747470733a2f2f692e696d6775722e636f6d2f6e643836664e342e706e67)

## Functions

### `createNewChat(userId)`

Creates a new chat thread for the specified user.

- `userId` (String): Unique identifier for the user.

### `startOrContinueChat(userId, userMessage, characterId)`

Starts or continues an existing chat thread for the specified user.

- `userId` (String): Unique identifier for the user.
- `userMessage` (String): Message to send in the chat.
- `characterId` (String): Unique identifier for the character.

### `deleteChat(userId)`

Deletes chat thread for the specified user.

- `userId` (String): Unique identifier for the user.

## `Response`

Response is built in JSON with 3 parts

- `userId` (String): Unique identifier for the user.
- `response` (String): Actual response of the AI.
- `messageId` (String): Unique identifier for the message.

## Note

This module is designed for mass usage and can efficiently handle unlimited users. It uses Node.js workers to create separate environment for each user. Therefore, the performance of the module depends on the cores of the server.

## 🚀 About Me

I'm Fatin Hasnat, a 15-year-old talented and ambitious Cyber Security Expert, Full-stack Next.js Developer and Python Developer. Always open for new ideas!

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://fatinhasnat.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fatin-hasnat-370843269/)
