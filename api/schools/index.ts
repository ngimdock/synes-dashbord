import instance from "api";
import { CreateSchoolDto } from "./dto";

/**
 * Get current user
 * @returns user data
 */
export const findAllSchools = async () => {
  try {
    const response = await instance.get("/establishments");

    if (response.status === 200) {
      return {
        data: response.data.data.data,
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
 * Create a new school
 * @param {CreateSchoolDto} data
 */
export const createSchool = async (data: CreateSchoolDto) => {
  try {
    const response = await instance.post("/establishments", data);

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
