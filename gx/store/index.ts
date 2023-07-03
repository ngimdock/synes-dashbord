import { createStore } from "@dilane3/gx";
import { currentUserSignal } from "gx/signals/current-user";
import synesEventsSignal from "gx/signals/synesEvents";
import modalSignal from "../signals/modal";
import { usersSignals } from "gx/signals/users";
import { contributionsSignals } from "gx/signals/contributions";

const store = createStore([
  modalSignal,
  synesEventsSignal,
  currentUserSignal,
  usersSignals,
  contributionsSignals,
]);

export default store;
