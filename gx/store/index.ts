import { createStore } from "@dilane3/gx";
import synesEventsSignal from "gx/signals/synesEvents";
import modalSignal from "../signals/modal";

const store = createStore([modalSignal, synesEventsSignal]);

export default store;
