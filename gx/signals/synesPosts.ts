import { createSignal } from "@dilane3/gx";
import Communique from "../../entities/communique/communique";
import SynesComplain from "../../entities/complains/synesComplain";
import SynesEvent from "../../entities/events/synesEvent";

export type SynesPostsState = {
  loading: boolean;
  error: boolean;
  selectedEvent: SynesEvent | null;
  selectedCommunique: Communique | null;
  selectedComplain: SynesComplain | null;
  events: SynesEvent[];
  communiques: Communique[];
  complains: SynesComplain[];
};

const synesPostsSignal = createSignal<SynesPostsState>({
  name: "synesPosts",
  state: {
    loading: false,
    error: false,
    selectedEvent: null,
    selectedCommunique: null,
    selectedComplain: null,
    events: [],
    communiques: [],
    complains: [],
  },
  actions: {
    loadSynesEvents: (state, payload: SynesEvent[]) => {
      return { ...state, events: payload };
    },
    loadSynesCommuniques: (state, payload: Communique[]) => {
      return { ...state, communiques: payload };
    },
    loadSynesComplains: (state, payload: SynesComplain[]) => {
      return { ...state, complains: payload };
    },

    addSynesEvent: (state, payload: SynesEvent) => {
      state.events.push(payload);

      return state;
    },

    addSynesComplain: (state, payload: SynesComplain) => {
      state.complains.push(payload);

      return state;
    },

    addSynesCommunique: (state, payload: Communique) => {
      state.communiques.push(payload);

      return state;
    },
  },
});

export default synesPostsSignal;
