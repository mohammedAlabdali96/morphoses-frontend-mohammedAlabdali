import axios from 'axios';

const API_KEY = 'eb46c700349d0bc443b533a821cec5db';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchNowPlaying = async (page: number): Promise<any> => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  return response.data;
};

export const fetchGenres = async (): Promise<any> => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return response.data;
};
