import { createStore } from "@dilane3/gx";
import { currentUserSignal } from "gx/signals/current-user";
import postCategoriesSignal from "gx/signals/post_categories";
import synesPostsSignal from "gx/signals/synesPosts";
import modalSignal from "../signals/modal";

const store = createStore([
  modalSignal, 
  currentUserSignal, 
  synesPostsSignal,
  postCategoriesSignal,
]);

export default store;
