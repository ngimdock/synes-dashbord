import instance from "api";
import { CreatePostDto } from "./dto";

/**
 * Get current user
 * @returns user data
 */
export const findAllPostCategories = async () => {
  try {
    const response = await instance.get("/post-categories");

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
 * Create post by category
 * @param {CreatePostDto} payload
 */
export const createPost = async (payload: CreatePostDto) => {
  try {
    const response = await instance.post("/posts", payload);

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