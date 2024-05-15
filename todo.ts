#! /usr/bin/env node

import inquirer from "inquirer";
import chalk, { colors } from "chalk"
import Choice from "inquirer/lib/objects/choice.js";

let todoList: string[] = []
let condition = true;

// Printing Welcome Message
console.log(chalk.blueBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))
console.log(chalk.green.bold("\n \t Welcome to myTodo List Application \n"))
console.log(chalk.blueBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))

let main = async () => {
    while(condition){
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an option you want to do",
                choices: ["Add task", "Delete task", "Update task", "View Todo List", "Exit"]
            }
        ]);
        if(option.choices === "Add task") {
            await addTask()
        }
        else if (option.choices === "View Todo List"){
            await viewTask()
        } else if (option.choices === "Exit"){
            condition = false;
        } else if (option.choices === "Delete task"){
            await deleteTask()
        } else if (option.choices === "Update task"){
            await updateTask()
        }
    }
}
// function to add new tasks to the list
let addTask = async () => {
    let newtask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:"
        }
    ]);
    todoList.push(newtask.task)
    console.log(chalk.green(`\n ${newtask.task} Task added successfully in Todo List`))
}
// function to view all todo list tasks
let viewTask = () => {
    console.log(chalk.blueBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))
    console.log(chalk.white("\n Your Todo List:"))
    todoList.forEach((task, index) => {
        console.log(`${index}: ${task}`)
    })
}
// function to delete a task from the list
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no' of the task you want to delete"
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index, 1);
    console.log(chalk.blueBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))
    console.log(chalk.red(`\n ${deletedTask} This task has been deleted successfully`))
}
// Function to update any task.
let updateTask = async () => {
    await viewTask()
    let updatedTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index number of the task you want to udpate."
        },
        {
            name: "new_task",
            type: "input",
            message: "Now enter the new task here"
        }
    ]);
    todoList[updatedTask.index] = updatedTask.new_task
    console.log(chalk.blueBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))
    console.log(chalk.green(`\n Task at index no. ${updatedTask.index} updated successfully [for updated list check option: View todo List]`));
}
main()

