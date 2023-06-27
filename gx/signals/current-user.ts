import { createSignal } from "@dilane3/gx";
import User from "entities/users/User";

export type CurrentUserState = {
  user: User | null;
  loading: boolean;
};

export const currentUserSignal = createSignal<CurrentUserState>({
  name: "current-user",
  state: {
    user: null,
    loading: true,
  },
  actions: {
    login: (state, payload: User) => {
      state.user = payload;
      state.loading = false;

      return state;
    },

    logout: (state) => {
      state.user = null;

      return state;
    },
  },
});
