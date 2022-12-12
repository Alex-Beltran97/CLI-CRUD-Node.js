const { updateDB, readDB } = require("./src/helpers/fileManager");
const { showMenu, pause, setNewTask, confirmMessage, deleteATask, updateTasks } = require("./src/helpers/inquirer");
const Task = require("./src/models/task");
const Tasks = require("./src/models/Tasks");
const colors = require("colors");

const main = async () =>{
  let opt = "";

  const tasks = new Tasks;
  const tasksDB = readDB();

  if(tasksDB){
    tasks.loadDB(tasksDB);
  };

  do{
    const selection  = await showMenu();
    opt = selection;
    
    switch(opt){
      case "1":
        const newTask = new Task(await setNewTask());
        const confirmCreation  = await confirmMessage(`Are you sure to create ${ newTask.desc.bgGreen }`);
        if (confirmCreation) tasks.createTask(newTask);
      break;
      case "2":
        tasks.listAllTasks();
      break;
      case "3":
        tasks.listCompletedPending();
      break;
      case "4":
        tasks.listCompletedPending(false);
      break;
      case "5":
        const ids = await updateTasks(tasks.listTasks);
        tasks.toogleTaskState(ids);
      break;
      case "6":
        const deleteData = await deleteATask(tasks.listTasks);
        if(deleteData!=="0"){
          const confirmDelete  = await confirmMessage(`Are you sure to delete ${ colors.bgYellow(tasks._list[deleteData]?.desc) }`);
          if (confirmDelete) tasks.deleteTask(deleteData);
        };
      break;
    };

    if(opt !== "0") await pause();

    updateDB(tasks.listTasks);

  }while(opt !== "0");

};

main();