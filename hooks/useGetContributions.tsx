import React from "react";
import { getUsers } from "api/users";
import { useActions, useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import User from "../entities/users/User";
import { UsersState } from "gx/signals/users";
import { ContributionState } from "gx/signals/contributions";
import { getContributions } from "api/contributions";
import Contribution from "../entities/contributions/Contribution";

export default function useGetContributions() {
  // Global state
  const { contributions } = useSignal<ContributionState>("contributions");

  // Global actions
  const { addContributions } = useActions("contributions");

  React.useEffect(() => {
    if (contributions.length > 0) return;

    getContributionsHandler();
  }, []);

  // Some handlers
  const getContributionsHandler = async () => {
    const { data } = await getContributions(40);

    if (data) {
      const contributions: Contribution[] = data.contributions.map(
        (contribution: any) => {
          const owner = new User(contribution.owner);

          return new Contribution({ ...contribution, owner });
        }
      );
      
      addContributions({ contributions, hasMore: data.hasMore, total: data.total });
    } else {
      console.log("error");
    }
  };
}
