import React from "react";
import { getUsers } from "api/users";
import { useActions, useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import User from "../entities/users/User";
import { UsersState } from "gx/signals/users";
import { ContributionState } from "gx/signals/contributions";
import { findAllSchools } from "api/schools";
import School from "../entities/schools/School";

export default function useGetSchools() {
  // Global state
  const schools = useSignal<School[]>("schools");

  // Global actions
  const { loadSchools } = useActions("schools");

  React.useEffect(() => {
    if (schools.length > 0) return;

    getSchoolsHandler();
  }, []);

  // Some handlers
  const getSchoolsHandler = async () => {
    const { data } = await findAllSchools();

    if (data) {
      const schools: School[] = data.map(
        (school: any) => {
          return new School({ ...school, address: school.adresse });
        }
      );

      loadSchools(schools);
    } else {
      console.log("error");
    }
  };
}
