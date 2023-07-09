import instance from "api";

/**
 * Get Post Categories
 * @returns post categories data
 */
export const getPostCategories = async () => {
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
