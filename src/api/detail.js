import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getDetail = async ({ movieId }) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie detail');
  }
};