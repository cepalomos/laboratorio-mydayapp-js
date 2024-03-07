import "./css/base.css";
import selector from "./js/selector";
import utils from "./js/utils";
// import selector from "./js/selector";

window.addEventListener("DOMContentLoaded", utils.loadMainFooter, false);
selector.inputTask.addEventListener("keydown", utils.addTask);
