#!/usr/bin/env node

const { execSync } = require("child_process");

const reset = "\x1b[0m";
const bright = "\x1b[1m";
const cyan = "\x1b[36m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const magenta = "\x1b[35m";
const red = "\x1b[31m";

console.log(
  `${magenta}${bright}\n[fatin_ca] Author: ${cyan}Md. Fatin Hasnat [fatinhasnat.com]${reset}`
);
console.log(
  `${magenta}${bright}[fatin_ca] Guide: ${cyan}https://github.com/Fatin1st/fatin_ca${reset}`
);
console.log(
  `${magenta}${bright}[fatin_ca] Running ${yellow}npx puppeteer browsers install chrome${cyan}...${reset}\n`
);

try {
  execSync("npx puppeteer browsers install chrome", { stdio: "inherit" });
  console.log(
    `${green}${bright}\n[fatin_ca] Initialization completed.${reset}`
  );
  console.log(`${green}${bright}[fatin_ca] Happy Hacking!${reset}`);
} catch (error) {
  console.error(`${bright}${red}\n[fatin_ca] Initialization failed.${reset}`);
  console.error(error);
  process.exit(1);
}
