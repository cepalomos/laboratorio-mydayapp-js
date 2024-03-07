import storeLocal from "./store";
import selector from "./selector";

const footer = selector.footer;
const main = selector.main;
const inputTask = selector.inputTask;
const listCount = selector.contador;
const filters = selector.filters;
// export const sayHello = (text) => {
//   return text;
// };

const loadMainFooter = () => {
  const store = storeLocal.getTasks();
  if (store.length === 0) {
    footer.style.setProperty("display", "none");
    main.style.setProperty("display", "none");
  } else {
    footer.style.setProperty("display", "block");
    main.style.setProperty("display", "block");
  }
};

const chargeData = (store) => {
  main.innerHTML = "";
  updateMain(main, store);
  listCounts(listCount, store);
};

const input = () => {
  const valueInput = inputTask.value;
  if (valueInput === "" || valueInput === undefined) {
    return null;
  } else {
    return valueInput.trim();
  }
};

const addTask = (e) => {
  if (e.key === "Enter") {
    const title = input();
    if (title) {
      storeLocal.addTask(title);
      inputTask.value = "";
    }
    loadMainFooter();
    chargeData(storeLocal.getTasks());
  }
};

const updateMain = (container, store) => {
  const ul = document.createElement("ul");
  ul.classList.add("todo-list");
  store.forEach((task) => {
    const li = document.createElement("li");
    task.completed ? li.classList.add("completed") : null;
    const div = document.createElement("div");
    div.classList.add("view");
    const radio = document.createElement("input");
    radio.classList.add("toggle");
    radio.setAttribute("type", "checkbox");
    if (task.completed) {
      radio.setAttribute("checked", true);
    } else if (radio.getAttribute("checked")) {
      radio.removeAttribute("checked");
    }
    radio.addEventListener("change", checkbox(li, task.id), false);
    div.appendChild(radio);
    const label = document.createElement("label");
    label.textContent = task.title;
    label.addEventListener("dblclick", editLabel(li));
    div.appendChild(label);
    const btnDestroy = document.createElement("button");
    btnDestroy.classList.add("destroy");
    btnDestroy.addEventListener("click", destroyTask(task.id));
    div.appendChild(btnDestroy);
    li.appendChild(div);
    const editInput = document.createElement("input");
    editInput.classList.add("edit");
    editInput.setAttribute("type", "text");
    editInput.addEventListener("keydown", upgradeTask(li, task.id));
    editInput.value = task.title;
    li.appendChild(editInput);
    ul.appendChild(li);
  });
  container.appendChild(ul);
};

const destroyTask = (id) => () => {
  storeLocal.deleteTask(id);
  loadMainFooter();
  chargeData(storeLocal.getTasks());
};

const checkbox = (container, id) => {
  return (e) => {
    if (e.target.checked) {
      storeLocal.completeTask(id);
      container.classList.add("completed");
    } else {
      storeLocal.unCompleteTask(id);
      container.classList.remove("completed");
    }
  };
};

const editLabel = (container) => (e) => {
  inputTask.removeAttribute("autofocus");
  container.classList.remove("completed");
  container.classList.add("editing");
  e.target.focus();
};

const upgradeTask = (container, id) => (e) => {
  if (e.key === "Enter") {
    const title = e.target.value.trim();
    if (title !== "") {
      storeLocal.modifeTask(id, title);
      container.classList.remove("editing");
    }
    loadMainFooter();
    chargeData(storeLocal.getTasks());
  }
};

const listCounts = (container, store) => {
  const span = document.createElement("span");
  store.length === 1
    ? (span.innerText = `${store.length} item left`)
    : (span.innerText = `${store.length} items left`);
  container.innerHTML = "";
  container.appendChild(span);
};

const filterPending = () => {
  menu("#/pending");
  const store = storeLocal.getTasks().filter((task) => !task.completed);
  chargeData(store);
  listCounts(listCount, store);
  loadMainFooter();
};

const filterCompleted = () => {
  menu("#/completed");
  const store = storeLocal.getTasks().filter((task) => task.completed);
  chargeData(store);
  listCounts(listCount, store);
  loadMainFooter();
};

const notFilter = () => {
  menu("#/");
  const store = storeLocal.getTasks();
  chargeData(store);
  listCounts(listCount, store);
  loadMainFooter();
};

const menu = (select) => {
  filters.innerHTML = "";
  const ref = ["#/", "#/pending", "#/completed"];
  const text = ["All", "Pending", "Completed"];
  ref.forEach((refElement, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", refElement);
    a.innerText = text[index];
    if (select === refElement) {
      a.classList.add("selected");
    }
    li.appendChild(a);
    filters.appendChild(li);
  });
};

const clearCompleted = () => {
  const store = storeLocal.getTasks();
  const newStore = store.filter((task) => !task.completed);
  storeLocal.saveTasks(newStore);
  chargeData(storeLocal.getTasks());
};
export default {
  loadMainFooter,
  input,
  addTask,
  filterPending,
  filterCompleted,
  notFilter,
  clearCompleted,
};
