#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 2000) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const welcome = async (param: string) => {
  const welcomeScreen = chalkAnimation.rainbow(param);

  await sleep();
  welcomeScreen.stop();
};

const randomNum = Math.floor(Math.random() * 10) + 1;
let answerTracker = false;
let msg = "Let's Start the Number-Guessing-Game--";

await welcome(msg);

while (!answerTracker) {
  const userValue = await inquirer.prompt({
    name: "selectAnumber",
    type: "number",
    message: "Please Enter a number b/w 1 and 10: ",
  });

  const usrInput: number = userValue.selectAnumber;

  if (!isNaN(usrInput)) {
    if (usrInput === randomNum) {
      msg = `

      ===========================
      ===========================
      ==   Congrates! You Won  ==
      ===========================
      ===========================
      
      `;
      console.clear();
      answerTracker = true;
      welcome(msg);
    } else {
      msg = usrInput > randomNum ? "Guess is High" : "Guess is Low";
      console.log(chalk.redBright(msg));
    }
  } else {
    console.log(chalk.redBright("Please Enter numbers only"));
  }
}
 
