const inquirer = require("inquirer");
const colors = require("colors");

const showMenu = async () =>{
  console.clear();
  console.log("================".green);
  console.log("Choose an option".white);
  console.log("================".green);
  
  const choices = [
    {
      value: "1",
      name:`${ "1.".green } Create A Task`
    },
    {
      value: "2",
      name:`${ "2.".green } List Tasks`
    },
    {
      value: "3",
      name:`${ "3.".green } List Completed Tasks`
    },
    {
      value: "4",
      name:`${ "4.".green } List Pending Tasks`
    },
    {
      value: "5",
      name:`${ "5.".green } Complete tasks`
    },
    {
      value: "6",
      name:`${ "6.".green } Delete A Task`
    },
    {
      value: "0",
      name:`${ "0.".green } Quit`
    }
  ]

  const { menu } = await inquirer.prompt([
    {
      type:"list",
      name:"menu",
      message:"Choose any option:",
      choices
    }
  ]);

  return menu;
};

const pause = async () =>{
  const { pause } = await inquirer.prompt([
    {
      type:"input",
      name:"pause",
      message: `Push ${ "ENTER".green } to continue`
    }
  ]);

  return pause;
};

const setNewTask = async () =>{
  const { newTask } = await inquirer.prompt([
    {
      type:"input",
      name:"newTask",
      message: `Set the name of the task`,
      validate: (payload)=>{
        if(!payload.length) return "Please set a task name";

        return true;
      }
    }
  ]);

  return newTask
};

const confirmMessage = async (message) =>{
  const { confirm } = await inquirer.prompt([
    {
      type:"confirm",
      name:"confirm",
      message
    }
  ]);

  return confirm;
};

const deleteATask = async (tasks = []) =>{
  const tasksList = tasks.map( (task, index) =>({
    value: task.id,
    name:`${ colors.green((index+1)+".") } ${ task.desc }`
  }));

  const { forDelete } = await inquirer.prompt([
    {
      type:"list",
      name:"forDelete",
      message:"Choose one to remove",
      choices: [...tasksList, { value: "0", name: `${ "0".green } Cancel` }]
    }
  ]);

  return forDelete;
};

const updateTasks = async (tasks = []) =>{
  const choices = tasks.map( (task, index) =>({
    value: task.id,
    name:`${ colors.green(index+".") } ${ task.desc }`,
    checked: task.completedAt ?? false
  }));

  const { ids } = await inquirer.prompt([
    {
      type:"checkbox",
      name:"ids",
      message:"Choose one to toggle its value",
      choices
    }
  ]);

  return ids;
};

module.exports = {
  showMenu,
  pause,
  setNewTask,
  confirmMessage,
  deleteATask,
  updateTasks
};