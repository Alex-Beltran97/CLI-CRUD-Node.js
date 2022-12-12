const { v4: uuidv4 } = require("uuid");
const colors = require("colors");

class Tasks {
  _list;

  constructor(){
    this._list = {};
  };

  createTask(task){
    this._list[task.id] = task;
    console.log("Task was created");
  };

  get listTasks(){
    const tasks = Object.values(this._list);
    return tasks;
  };

  listAllTasks(){
    this.getTaskDescription(this.listTasks);
  };

  loadDB(tasks = []){
    tasks.forEach( task =>{
      this._list[task.id] = task;
    });
  };
  
  listCompletedPending(completed = true){
    const completedTasks = this.listTasks.filter( task => task.completedAt);
    const pendingTasks = this.listTasks.filter( task => task.completedAt===null);

    if(completed){
      this.getTaskDescription(completedTasks);
    }else{
      this.getTaskDescription(pendingTasks);
    };

  };

  getTaskDescription(array = []){
    array.map( (task, index) => {
      const idx = index + 1;
      const { desc, completedAt} = task;
      const state = completedAt ? "Completed".green : "Pending".red;

      console.log(`${ idx }. ${ desc } :: ${ state } :: ${ completedAt?.green ?? "" }`);
    });
  };

  deleteTask(id = ""){
    if(this._list[id]){
      delete this._list[id];
    };
    console.log("Task was deleted");
  };

  toogleTaskState(ids = []){
    ids.forEach( id =>{
      if(this._list[id]){
        this._list[id].completedAt = new Date().toISOString();
      };
    });

    this.listTasks.forEach( task =>{
      if(!ids.includes(task.id)){
        this._list[task.id].completedAt = null;
      };
    });
  };
};

module.exports = Tasks;