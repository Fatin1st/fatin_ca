# fatin_ca - Character AI Unofficial API

fatin_ca is a Node.js module inspired by the `node_characterai` module, designed to provide a simplified interface for creating and managing chat threads with CharacterAI. One of its key features is the ability to handle mass usage and support unlimited users seamlessly.

## Installation

To install the fatin_ca module, use the following command:

```bash
npm install fatin_ca
```

## Usage

Here's an example code snippet demonstrating how to use the fatin_ca module:

```javascript
const fatin = require("fatin_ca");

const userMessage = "Hello";
const userId = "2009-09-27";
const characterId = "s3kGJkdd9nW1-I0HVrH0r3zY3N6TzgPU9jjhhdshdb";

// Create a new chat thread
fatin.createNewChat(userId, (threadName) => {
  console.log("Thread Name: ", threadName);
});

// Start or continue the chat thread and delete when got response
fatin.startOrContinueChat(userId, userMessage, characterId, (response) => {
  console.log("Response: ", response);
  fatin.deleteChat(userId);
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

### `createNewChat(userId)`

Deletes chat thread for the specified user.

- `userId` (String): Unique identifier for the user.

## Note

This module is designed for mass usage and can efficiently handle unlimited users. It simplifies the interaction with CharacterAI for creating and managing chat threads in Node.js applications.
## 🚀 About Me
I'm Fatin Hasnat, a 15-year-old talented and ambitious Cyber Security Expert, Full-stack Next.js Developer and Python Developer. Always open for new ideas!


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://fatinhasnat.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fatin-hasnat-370843269/)
