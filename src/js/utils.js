import storeLocal from "./store";
import selector from "./selector";

const footer = selector.footer;
const main = selector.main;
const inputTask = selector.inputTask;
// export const sayHello = (text) => {
//   return text;
// };

const loadMainFooter = () => {
  const store = storeLocal.getTasks();
  const values = Object.values(store);
  if (values.length === 0 || values === null) {
    footer.style.setProperty("display", "none");
    main.style.setProperty("display", "none");
  } else {
    main.innerHTML = "";
    updateMain(main);
    footer.style.setProperty("display", "block");
    main.style.setProperty("display", "block");
  }
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
  }
};

const updateMain = (container) => {
  const store = Object.values(storeLocal.getTasks());
  const ul = document.createElement("ul");
  ul.classList.add("todo-list");
  store.forEach((task) => {
    const li = document.createElement("li");
    task.complete ? li.classList.add("completed") : null;
    const div = document.createElement("div");
    div.classList.add("view");
    const radio = document.createElement("input");
    radio.classList.add("toggle");
    radio.setAttribute("type", "checkbox");
    task.complete
      ? radio.setAttribute("checked")
      : radio.removeAttribute("checked");
    div.appendChild(radio);
    const label = document.createElement("label");
    label.textContent = task.title;
    div.appendChild(label);
    const btnDestroy = document.createElement("button");
    btnDestroy.classList.add("destroy");
    div.appendChild(btnDestroy);
    li.appendChild(div);
    const editInput = document.createElement("input");
    editInput.classList.add("edit");
    editInput.value = task.title;
    li.appendChild(editInput);
    ul.appendChild(li);
  });
  container.appendChild(ul);
};

export default {
  loadMainFooter,
  input,
  addTask,
};
