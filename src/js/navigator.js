import utils from "./utils";

export const navigation = () => {
  if (location.hash.startsWith("#/pending")) {
    utils.filterPending();
  } else if (location.hash.startsWith("#/completed")) {
    utils.filterCompleted();
  } else {
    utils.notFilter();
  }
};
