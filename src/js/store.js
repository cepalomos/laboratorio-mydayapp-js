const TASKS = "tasks";
const addTask = (title) => {
  const store = getTasks();
  const id = self.crypto.randomUUID();
  const task = { id, title, complete: false };
  store[id] = task;
  saveTasks(store);
};
const modifeTask = (id, newTitle) => {
  const store = getTasks();
  store[id].title = newTitle;
};
const deleteTask = (id) => {
  const store = getTasks();
  store[id] = undefined;
  saveTasks(store);
};
const completeTask = (id) => {
  const store = getTasks();
  store[id].complete = true;
  saveTasks(store);
};
const unCompleteTask = (id) => {
  const store = getTasks();
  store[id].complete = false;
  saveTasks(store);
};
const getTasks = () => {
  const store = JSON.parse(localStorage.getItem(TASKS));
  return store ? store : {};
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
};
