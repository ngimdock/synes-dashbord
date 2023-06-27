import instance from "api";

/**
 * Login the user
 * @param email user email
 * @param password user password
 * @returns true if login success, false otherwise
 */
export const login = async (email: string, password: string) => {
  try {
    const reponse = await instance.post("/auth/login", {
      email,
      password,
    });

    if (reponse.status === 200) {
      return {
        data: true
      };
    }

    return {
      error: false
    }
  } catch (error) {
    console.log(error);

    return {
      error: false
    };
  }
}