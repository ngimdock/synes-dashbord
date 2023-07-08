import { createSignal } from "@dilane3/gx";
import SynesEvent, { synesEvent } from "entities/events/synesEvent";
import { asynchronousEmulation } from "utils";
import { synesEvents } from "utils/demo/tableData";

export type SynesEventsState = {
  loading: boolean,
  error: boolean,
  selectedEvent: SynesEvent | null
  events: SynesEvent[]
};

const synesEventsSignal = createSignal<SynesEventsState>({
  name: "synesEvents",
  state: {
    loading: false,
    error: false,
    selectedEvent: null,
    events: []
  },
  actions: {
    loadSynesEvents: (state, payload: SynesEvent[]) => {
      return {...state, communiques: payload}
    },
    addSynesEvent: (state, payload: SynesEvent) => {
      const newSynesEventsList = state.events;
      newSynesEventsList?.push(payload);
      return { ...state, payload: newSynesEventsList }    
    }
  },
});

export default synesEventsSignal;