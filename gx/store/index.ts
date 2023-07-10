import { createStore } from "@dilane3/gx";
import { currentUserSignal } from "gx/signals/current-user";
import postCategoriesSignal from "gx/signals/post_categories";
import synesPostsSignal from "gx/signals/synesPosts";
import modalSignal from "../signals/modal";
import { usersSignals } from "gx/signals/users";
import { contributionsSignals } from "gx/signals/contributions";
import { schoolsSignal } from "gx/signals/schools";

const store = createStore([
  modalSignal,
  currentUserSignal,
  usersSignals,
  contributionsSignals,
  schoolsSignal,
  synesPostsSignal,
  postCategoriesSignal,
]);

export default store;
