#! /usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
// import currency_list from './currencies.js';
const welcomeMsg = async () => {
    await figlet('Sensei Currency Converter', (err, data) => {
        if (err) {
            console.log('Something went wrong...');
        }
        console.log(chalk.yellow(data));
    });
};
await welcomeMsg();
let currencies_list = ['PKR', 'USD', 'EUR', 'JPY', 'GBP', 'CNY', 'AUD', 'CAD', 'SAR'];
let equal_in_usd = {
    //1 usd equal to in currency
    'PKR': 225.61,
    'USD': 1,
    'EUR': 0.95,
    'JPY': 136.68,
    'GBP': 0.81,
    'CNY': 6.97,
    'AUD': 1.47,
    'CAD': 1.37,
    'SAR': 3.76
};
//Ask for base currency
const choseCurr = async (current) => {
    let currency = await inquirer.prompt([{
            name: 'currency',
            type: 'list',
            message: `Please chose your ${current} currency`,
            choices: currencies_list
        }]);
    return currency.currency;
};
//Ask for amout
const asK_amount = async () => {
    let amount = await inquirer.prompt([{
            name: 'amount',
            type: 'number',
            message: 'Please enter amount:',
        }]);
    return amount.amount;
};
//Convert
const convert = async (base, amount, target) => {
    let base_in_usd = amount / equal_in_usd[base];
    let target_amout = base_in_usd * equal_in_usd[target];
    return target_amout;
};
//Convert again
const ask_again = async () => {
    let ans = await inquirer.prompt([{
            name: 'ans',
            type: 'list',
            message: 'Do you want to convert again?',
            choices: ['YES', 'NO']
        }]);
    return ans.ans;
};
const main = async () => {
    setTimeout(async () => {
        let base = await choseCurr('Current');
        let amount = await asK_amount();
        let target = await choseCurr('Target');
        let result = await convert(base, amount, target);
        console.log(chalk.yellow(`${amount} ${base} ${chalk.green('is equal to')} ${result.toFixed(3)} ${target}`));
        let user_ans = await ask_again();
        if (user_ans == 'YES') {
            await main();
        }
    }, 1000);
};
await main();
