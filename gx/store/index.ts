import { createStore } from "@dilane3/gx";
import { currentUserSignal } from "gx/signals/current-user";
import synesEventsSignal from "gx/signals/synesEvents";
import modalSignal from "../signals/modal";

const store = createStore([modalSignal, synesEventsSignal, currentUserSignal]);

export default store;
