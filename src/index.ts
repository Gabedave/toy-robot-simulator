import { validCommands } from "./utils/constants";
import * as chalk from "chalk";
import Robot from "./robot/Robot";
import * as fs from "fs";

function handleStdIn(data: Buffer | string, robot: Robot) {
  const command = data.toString().trim().split(" ");

  if (!validCommands.includes(command[0])) {
    process.stdout.write(
      chalk.red.bold("Invalid Command. ") +
        `Valid commands are ${validCommands
          .map((_v) => chalk.green(_v))
          .join(", ")}\n`
    );
  } else {
    try {
      const output = robot.inputCommand(command);
      output && process.stdout.write(output + "\n");
    } catch (e) {
      process.stdout.write(chalk.red.bold(e.message + "\n"));
    }
  }
}

function startApp() {
  const robot = new Robot();
  const filePath = process.argv[2];

  if (filePath) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        process.stdout.write(`Error reading file: ${err}\n`);
        return;
      }
      let lines = data.split("\n");
      lines.forEach((line) => {
        process.stdout.write(chalk.gray(`Input: ${line}\n`));
        handleStdIn(line, robot);
      });
    });
  } else {
    process.stdout.write("Please input a command:\n");
    process.stdin.on("data", (data) => {
      return handleStdIn(data, robot);
    });
  }
}

startApp();
