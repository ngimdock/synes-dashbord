import { createSignal } from "@dilane3/gx";
import { synesCommunique } from "entities/communique/communique";
import { asynchronousEmulation } from "utils";
import { coms } from "utils/demo/tableData";

export type SynesCommuniqueState = {
  loading: boolean,
  error: boolean,
  selectedCommunique: synesCommunique | null
  communiques: synesCommunique[]
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
    loadSynesCommuniques: (state) => {
      state.loading = true;
      
      const synesCommuniquesList: synesCommunique[] = [];

      for (let index = 0; index < coms.length; index++) {
        const newSynesCommunique: synesCommunique = {
          description: coms[index].description,
          file: coms[index].file,
          photo: coms[index].photo,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        synesCommuniquesList.push(newSynesCommunique);
      }

      console.log(synesCommuniquesList);

      asynchronousEmulation();

      state.loading = false ;
      
      return {
        ...state,
        communiques: synesCommuniquesList
      }
    },
    addSynesEvent: (state, payload: synesCommunique) => {
      const newSynesCommuniquesList = state.communiques;
      newSynesCommuniquesList?.push(payload);
      return { ...state, communiques: newSynesCommuniquesList }    
    }
  }
})

export default synesCommuniquesSignal;