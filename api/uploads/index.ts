import instance from "api";

/**
 * Get current user
 * @returns user data
 */
export const upload = async (formData: FormData) => {
  try {
    const response = await instance.post("/upload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data) {
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