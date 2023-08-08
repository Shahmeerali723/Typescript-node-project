#! /usr/bin/env node

/*
1-Print todo list
2-Add todo task
3-Mark a task as complete
4-See completed tasks
5-Remove/delete completed task
*/

import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';

const welcomeTodo=async()=>{
    await figlet('Sensei Todo List',(err,data)=>{
        if(err){
            console.log('Something went wrong...');
        }
        console.log(chalk.green(data));
        
    })
    
}

await welcomeTodo();

let todoList=['Meeting with HR','Setup Production','Announce a feature']
let completedTasksArr=['Breakfast'];

const main=async () =>{
    let q1=await inquirer.prompt([{
        name:'q1',
        type:"list",
        message:'What do you want to do?\n',
        choices:[
            'Print todo list', //done
            'Add todo task',   //done
            'Mark a task as complete',
            'See completed tasks', //done
            'Remove/delete a completed task',
            'Exit'  //done
        ]        
    }
    ])
    return q1.q1
}

//Print todo list
const printTodoList=(todoList:string[])=>{
    for(let i=0;i<todoList.length;i++){
        console.log(chalk.yellow(`${i+1}-${todoList[i]}`));
    }
}


//Add new todo task
const addTodo=async(todoList:string[])=>{
    let userAnswer=await inquirer.prompt([{
        name:'newTodo',
        type:'input',
        message:'Please add a todo'
    }])
    todoList.push(userAnswer.newTodo)
    return todoList
}

// Mark a task as complete

const markComplete=async ()=>{
    let ans=await inquirer.prompt([{
        name:'completed',
        type:'list',
        message:'Please select a completed task!',
        choices:todoList
    }])
    return ans.completed
}

//Remove/delete a completed task
const removeTask=async ()=>{
    let ans=await inquirer.prompt([{
        name:'removed',
        type:'list',
        message:'Please select a completed task!',
        choices:completedTasksArr
    }])
    return ans.removed
}

const action=async()=>{
    setTimeout(async()=>{
        let q1=await main();
    switch (q1) {
        case 'Print todo list':
            printTodoList(todoList);             
            await action();
            break;
        case 'Add todo task':
            todoList=await addTodo(todoList)
            await action();
            break
        case 'Mark a task as complete':
            let completedTask=await markComplete();
            completedTasksArr.push(completedTask);
            todoList.splice(todoList.indexOf(completedTask),1);
            await action();
            break
        case 'See completed tasks':
            for(let i=0;i<completedTasksArr.length;i++){
                console.log(chalk.strikethrough.green(`${i+1}-${completedTasksArr[i]}`));
            }
            await action();
            break;
        case 'Remove/delete a completed task':
            let removedTask=await removeTask()
            completedTasksArr.splice(completedTasksArr.indexOf(removedTask),1);
            await action();
            break
        case 'Exit':
            console.log(chalk.blue('Thank you for using  Sensei todo list app.'));
            break;
        default:
            break;
    }

},500)
}
await action();