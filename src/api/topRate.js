import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTopRateMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        page
      },
    });
    return response.data.results || [];
  } catch (error) {
    throw new Error('Error fetching top rated movies');
  }
};