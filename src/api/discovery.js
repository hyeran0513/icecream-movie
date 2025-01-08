import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getDiscovery = async ({filterParams}, page = 1) => {
  try {
    const params = {
      api_key: API_KEY,
      language: "ko-KR",
      page,
    };

    if (filterParams.genre) {
      params.with_genres = filterParams.genre;
    }

    if (filterParams.sort) {
      params.sort_by = filterParams.sort;
    }

    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params,
    });
    return response.data.results || [];
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};