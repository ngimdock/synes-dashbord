import { createSignal } from "@dilane3/gx";
import Communique, { synesCommunique } from "../../entities/communique/communique";
import { asynchronousEmulation } from "utils";
import { coms } from "utils/demo/tableData";

export type SynesCommuniqueState = {
  loading: boolean,
  error: boolean,
  selectedCommunique: Communique | null
  communiques: Communique[]
}

const synesCommuniquesSignal = createSignal<SynesCommuniqueState>({
  name: 'synesCommuniques',
  state: {
    loading: false,
    error: false,
    selectedCommunique: null,
    communiques: []
  },
  actions: {
    loadSynesCommuniques: (state, payload: Communique[]) => {
      return {...state, communiques: payload}
    },
    addSynesEvent: (state, payload: synesCommunique) => {
      const newSynesCommuniquesList = state.communiques;
      newSynesCommuniquesList?.push(new Communique(payload));
      return { ...state, communiques: newSynesCommuniquesList }    
    }
  }
})

export default synesCommuniquesSignal;