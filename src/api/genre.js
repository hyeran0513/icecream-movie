import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
      },
    });
    return response.data.genres || [];
  } catch (error) {
    throw new Error('Error fetching genres');
  }
};
