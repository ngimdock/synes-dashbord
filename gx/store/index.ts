import { createStore } from "@dilane3/gx";
import { currentUserSignal } from "gx/signals/current-user";
import postCategoriesSignal from "gx/signals/post_categories";
import synesCommuniquesSignal from "gx/signals/synesCommuniques";
import synesComplainSignal from "gx/signals/synesComplains";
import synesEventsSignal from "gx/signals/synesEvents";
import modalSignal from "../signals/modal";

const store = createStore([modalSignal, synesEventsSignal, currentUserSignal, synesComplainSignal, synesCommuniquesSignal, postCategoriesSignal]);

export default store;
