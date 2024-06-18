#! /usr/bin/env node

import inquirer from "inquirer";
import chalk, { Chalk } from "chalk";

let todoList: string[] = [];
let conditions = true;

console.log(
  chalk.cyan.bold("\n \tGood day! What can we achieve together today?")
);
console.log(chalk.red.bold("-".repeat(60)));

let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.green.bold("\nWhat's your next move? Choose an option:\n"),
        choices: [
          "Add New Task",
          "Remove Task",
          "Edit Task",
          "Show To-Do List",
          "Close App",
        ],
      },
    ]);
    if (option.choice === "Add New Task") {
      await addTask();
    } else if (option.choice === "Remove Task") {
      await removeTask();
    } else if (option.choice === "Edit Task") {
      await editTask();
    } else if (option.choice === "Show To-Do List") {
      await showTask();
    } else if (option.choice === "Close App") {
      console.log(chalk.red.bold("\nGoodbye! Have a productive day ahead!\n"));
      conditions = false;
    }
  }
};

// Function to add new task in to-do list:
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.blue.bold("Input your new task:"),
    },
  ]);
  todoList.push(newTask.task);
  console.log(
    chalk.bold(`${chalk.bold.cyan(newTask.task)} added to your to-do list!`)
  );
};

// Function to show all to-do list task:
let showTask = () => {
  console.log(chalk.blue.bold("\nYour to-dos: \n"));
  
  todoList.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
};

// Function to remove a task from the to-do list:
let removeTask = async () => {
  await showTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.yellow(
        "Enter the number of the task you want to remove from your to-do list."
      ),
    },
  ]);
  let removeTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(
    chalk.bold(
      `The ${chalk.cyan.bold(removeTask)} task is no longer on your list!`
    )
  );
};

// Function to edit a task:
let editTask = async () => {
  await showTask();
  let edit_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.yellow(
        "\nInput the number of the task you want to edit:"
      ),
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.cyan.bold("Create a new task:"),
    },
  ]);
  
  todoList[edit_task_index.index - 1] = edit_task_index.new_task;
  console.log(
    chalk.bold(
      `Your to-do list is now edited at number ${chalk.cyan.bold(edit_task_index.index)}.`
    )
  ); 
};

main();
