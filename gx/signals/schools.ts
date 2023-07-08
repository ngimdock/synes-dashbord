import { createSignal } from "@dilane3/gx";
import School from "entities/schools/School";

export const schoolsSignal = createSignal<School[]>({
  name: "schools",
  state: [],
  actions: {
    loadSchools: (_, payload: School[]) => {
      return payload;
    },

    addSchool: (state, payload: School) => {
      return [...state, payload];
    }
  }
});