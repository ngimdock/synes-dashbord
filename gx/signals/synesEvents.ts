import { createSignal } from "@dilane3/gx";
import { synesEvent } from "entities/events/SynesEvent";
import { asynchronousEmulation } from "utils";
import { synesEvents } from "utils/demo/tableData";

export type SynesEventsState = {
  loading: boolean,
  error: boolean,
  payload: synesEvent[] | synesEvent | null;
};

const synesEventsSignal = createSignal<SynesEventsState>({
  name: "synesEvents",
  state: {
    loading: false,
    error: false,
    payload: []
  },
  actions: {
    loadSynesEvents: (state) => {
      state.loading = true;
      
      const synesEventsList: synesEvent[] = [];

      for (let index = 0; index < synesEvents.length; index++) {
        const newSynesEvent: synesEvent = {
          description: synesEvents[index].description,
          file: synesEvents[index].file,
          photo: synesEvents[index].photo,
          createdAt: new Date(),
        }

        synesEventsList.push(newSynesEvent);
      }

      console.log(synesEventsList);

      asynchronousEmulation();

      state.loading = false ;
      
      return {
        ...state,
        payload: synesEventsList
      }
    },
    addSynesEvent: (state, payload) => {
      const newSynesEventsList = state.payload as synesEvent[];
      newSynesEventsList?.push(payload);
      return { ...state, payload: newSynesEventsList }    
    }
  },
});

export default synesEventsSignal;