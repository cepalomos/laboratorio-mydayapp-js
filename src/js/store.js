const TASKS = "mydayapp-js";
const addTask = (title) => {
  const store = getTasks();
  const id = self.crypto.randomUUID();
  const task = { id, title, completed: false };
  store.push(task);
  saveTasks(store);
};
const modifeTask = (id, newTitle) => {
  const store = getTasks();
  for (const task of store) {
    if (task.id === id) {
      task.title = newTitle;
    }
  }
  saveTasks(store);
};
const deleteTask = (id) => {
  const store = getTasks();
  const newStore = store.filter((taskArray) => taskArray.id !== id);
  saveTasks(newStore);
};
const completeTask = (id) => {
  const store = getTasks();
  const task = store.find((taskArray) => taskArray.id === id);
  task.completed = true;
  const newStore = store.filter((taskArray) => taskArray.id !== id);
  saveTasks([...newStore, task]);
};
const unCompleteTask = (id) => {
  const store = getTasks();
  const task = store.find((taskArray) => taskArray.id === id);
  task.completed = false;
  const newStore = store.filter((taskArray) => taskArray.id !== id);
  saveTasks([...newStore, task]);
};
const getTasks = () => {
  const store = JSON.parse(localStorage.getItem(TASKS));
  return store ? store : [];
};
const saveTasks = (tasks) => {
  const stringTasks = JSON.stringify(tasks);
  localStorage.setItem(TASKS, stringTasks);
};

export default {
  addTask,
  modifeTask,
  deleteTask,
  completeTask,
  getTasks,
  unCompleteTask,
  saveTasks,
};
