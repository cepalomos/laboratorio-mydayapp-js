import "./css/base.css";
import { navigation } from "./js/navigator";
import selector from "./js/selector";
import utils from "./js/utils";
// import selector from "./js/selector";

window.addEventListener("DOMContentLoaded", navigation, false);
window.addEventListener("hashchange", navigation, false);
selector.inputTask.addEventListener("keydown", utils.addTask);
selector.clear.addEventListener("click", utils.clearCompleted);
