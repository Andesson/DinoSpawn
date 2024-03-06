
import axios from 'axios';

const API_URL = 'http://localhost:8083/player';

export const getPlayerInfoByName = async (playerName: string) => {
  try {
    const response = await axios.get(`${API_URL}/${playerName}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter informações do jogador.');
  }
};
