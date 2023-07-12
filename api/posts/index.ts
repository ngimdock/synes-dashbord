import instance from "api";
import { CreatePostDto } from "./dto";

/**
 * Get Post Categories
 * @returns post categories data
 */
export const getPosts = async (id: string) => {
  try {
    const response = await instance.get(`/post-categories/${id}`);

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
 * Create a new post
 * @param payload post data
 * @returns data or error
 */
export const createPost = async (
  // payload: FormData
  payload: CreatePostDto
  ) => {
  try {
    const response = await instance.post("/posts", payload);

    if (response.status === 200) {
      return {
        data: response.data
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
