import { createSignal } from "@dilane3/gx";
import User from "entities/users/User";

export type UsersState = {
  users: User[];
  loading: boolean;
}

export const usersSignals = createSignal<UsersState>({
  name: "users",
  state: {
    users: [],
    loading: false,
  },
  actions: {
    addUsers: (state, payload: User[]) => {
      state.users = payload;

      return state;
    }
  }
});