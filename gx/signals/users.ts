import { createSignal } from "@dilane3/gx";
import User from "entities/users/User";

export type UsersState = {
  users: User[];
  loading: boolean;
  hasMore: boolean;
  total: number;
};

export const usersSignals = createSignal<UsersState>({
  name: "users",
  state: {
    users: [],
    loading: false,
    hasMore: true,
    total: 0,
  },
  actions: {
    addUsers: (
      state,
      payload: { users: User[]; hasMore: boolean; total: number }
    ) => {
      console.log("addUsers", payload)
      state.users = [...state.users, ...payload.users];
      state.hasMore = payload.hasMore;
      state.total = payload.total;

      return state;
    },

    addUser: (state, payload: User) => {
      state.users.push(payload);

      return state;
    },
  },
});
