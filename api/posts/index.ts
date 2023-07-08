import instance from "api";

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
