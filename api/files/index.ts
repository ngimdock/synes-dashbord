import instance from "api";

/**
 * Save one or more images on the server
 * @returns return data or error
 */
export const saveImage = async (multi: boolean, payload: FormData) => {
  try {
    const response = await instance.post(`/upload/file${multi ? 's' : ''}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

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
};
