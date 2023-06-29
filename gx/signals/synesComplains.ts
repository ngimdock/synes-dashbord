import { createSignal } from "@dilane3/gx";
import { synesComplain } from "entities/complains/synesComplain";
import { asynchronousEmulation } from "utils";
import { complains } from "utils/demo/tableData";

export type SynesComplainsState = {
  loading: boolean,
  error: boolean,
  complains: synesComplain[];
  selectedComplain: synesComplain | null
}

const synesComplainSignal = createSignal<SynesComplainsState>({
  name: "synesComplains",
  state: {
    loading: false,
    error: false,
    complains: [],
    selectedComplain: null,
  },
  actions: {
    loadSynesComplains: (state) => {
      state.loading = true;
      
      const synesComplainsList: synesComplain[] = [];

      for (let index = 0; index < complains.length; index++) {
        const newSynesComplain: synesComplain = {
          content: complains[index].description,
          file: [complains[index].file],
          photo: [complains[index].photo],
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        synesComplainsList.push(newSynesComplain);
      }

      console.log(synesComplainsList);

      asynchronousEmulation();

      state.loading = false ;
      
      return {
        ...state,
        complains: synesComplainsList
      }
    },
    addSynesComplain: (state, payload: synesComplain) => {
      const newSynesComplainList = state.complains;
      newSynesComplainList.push(payload);
      return { ...state, payload: newSynesComplainList }    
    }
  },
})

export default synesComplainSignal