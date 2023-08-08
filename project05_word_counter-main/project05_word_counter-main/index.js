#! /usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
// import currency_list from './currencies.js';
const welcomeMsg = async () => {
    await figlet('Sensei Word Counter', (err, data) => {
        if (err) {
            console.log('Something went wrong...');
        }
        console.log(chalk.yellow(data));
    });
};
await welcomeMsg();
//Ask for paragraph
const ask_paragraph = async () => {
    let res = await inquirer.prompt([{
            name: 'para',
            type: 'input',
            message: 'Please write your paragraph: '
        }]);
    return res.para;
};
//count words and letters
const words_letters = (wordsLetters) => {
    let words = wordsLetters.split(' ');
    let total_words = words.length;
    let total_letters = 0;
    words.forEach(w => total_letters += w.length);
    return { total_words, total_letters };
};
////count again
const ask_again = async () => {
    let ans = await inquirer.prompt([{
            name: 'ans',
            type: 'list',
            message: 'Do you want to count again?',
            choices: ['YES', 'NO']
        }]);
    return ans.ans;
};
const main = async () => {
    setTimeout(async () => {
        let user_para = await ask_paragraph();
        let { total_words, total_letters } = words_letters(user_para);
        console.log(chalk.green(`Total words are ${chalk.yellow(total_words)} and total letters are ${chalk.yellow(total_letters)}`));
        let user_ans = await ask_again();
        if (user_ans == 'YES') {
            await main();
        }
    }, 500);
};
await main();
