import { createStore } from "@dilane3/gx";
import { currentUserSignal } from "gx/signals/current-user";
import synesCommuniquesSignal from "gx/signals/synesCommuniques";
import synesComplainSignal from "gx/signals/synesComplains";
import synesEventsSignal from "gx/signals/synesEvents";
import modalSignal from "../signals/modal";

const store = createStore([modalSignal, synesEventsSignal, currentUserSignal, synesComplainSignal, synesCommuniquesSignal]);

export default store;
