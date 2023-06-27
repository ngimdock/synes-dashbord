import instance from "api";

/**
 * Get current user
 * @returns user data
 */
export const getMe = async () => {
  try {
    const response = await instance.get("/users/me");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: true,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
    };
  }
};
