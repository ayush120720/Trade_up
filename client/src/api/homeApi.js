import apiClient from "../services/apiClient";

export const fetchGainersAndLosers = async () => {
  try {
      const response = await apiClient.get('/home/top-gainers-losers');
      return response.data;
  } catch (error) {
      console.error("Error fetching gainers and losers:", error);
      throw error;
  }
};