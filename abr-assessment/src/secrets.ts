const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/gofish";
const API_KEY = process.env.REACT_APP_API_KEY;
export const API_URL = `${BASE_URL}?apikey=${API_KEY}`;
