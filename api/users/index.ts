import instance from "api";
import { CreateUserDto } from "./dto";

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

/**
 * Get all users
 * @returns users data
 */
export const getUsers = async (limit = 10, offset = 0) => {
  try {
    const response = await instance.get(`/users?offset=${offset}&limit=${limit}`);

    if (response.status === 200) {
      return {
        data: {
          users: response.data.data.data,
          hasMore: response.data.data.hasMore,
          total: response.data.data.count,
        },
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
}


/**
 * Create user
 * @param data 
 */
export const createUser = async (data: CreateUserDto) => {
  try {
    const response = await instance.post("/users", data);

    if (response.status === 201) {
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
}