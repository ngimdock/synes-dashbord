import React from "react";
import { getUsers } from "api/users";
import { useActions, useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import User from "../entities/users/User";
import { UsersState } from "gx/signals/users";

export default function useGetUsers() {
  // Global state
  const { users } = useSignal<UsersState>("users");

  // Global actions
  const { addUsers } = useActions("users");

  React.useEffect(() => {
    if (users.length > 0) return;

    getUsersHandler();
  }, [users]);

  // Some handlers
  const getUsersHandler = async () => {
    const { data } = await getUsers(5);

    if (data) {
      const users: User[] = data.users.map((user: any) => new User(user));

      addUsers({ users, hasMore: data.hasMore, total: data.total });
    } else {
      console.log("error")
    }
  };
}
