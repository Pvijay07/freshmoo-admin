import axios from 'axios';

const api = axios.create({
  baseURL: "http://your-api-url.com",
});

export const getProducts = async () => {
  try {
    const response = await api.get("/api/getProducts");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};



