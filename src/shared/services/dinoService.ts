
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getDinoInfoByName = async (dinoName: string) => {
  try {
    const response = await axios.get(`${API_URL}/dino/${dinoName}`);
    console.log(`${API_URL}/dino/${dinoName}`);
    return response.data;
  } catch (error) {
    throw new Error('Error getting Dino information.');
  }
};
