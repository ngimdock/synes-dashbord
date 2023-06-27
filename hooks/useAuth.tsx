import React from "react";
import { getMe } from "api/users";
import { useActions, useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import User from "../entities/users/User";

export default function useAuth() {
  // Global state
  const { user: currentUser } = useSignal<CurrentUserState>("current-user");

  // Global actions
  const { login } = useActions("current-user");

  React.useEffect(() => {
    if (currentUser) return;

    getMeHandler();
  }, [currentUser]);

  // Some handlers
  const getMeHandler = async () => {
    const { data } = await getMe();

    if (data) {
      const user = new User(data);

      login(user);
    } else {
      login(null);
    }
  };
}
