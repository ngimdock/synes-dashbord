import instance from "api";
import { CreateContributionDto } from "./dto";

/**
 * Get current user
 * @returns user data
 */
export const getContributions = async (limit = 10, offset = 0) => {
  try {
    const response = await instance.get(
      `/contributions?offset=${offset}&limit=${limit}`
    );

    if (response.status === 200) {
      return {
        data: {
          contributions: response.data.data.data as any[],
          total: response.data.data.count,
          hasMore: response.data.data.hasMore,
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
};

/**
 * Create contribution
 * @param payload
 * @returns
 */
export const createContribution = async (payload: CreateContributionDto) => {
  try {
    const response = await instance.post("/contributions", payload);

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
