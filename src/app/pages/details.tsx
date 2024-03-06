import React, { useState } from 'react';
import { getPlayerInfoByName } from '@/shared/services/playerService'
import { Button } from '@/shared/components/ui/button';


const PlayerInfo = () => {
    const [playerId, setPlayerId] = useState('');
    const [playerData, setPlayerData] = useState<any>(null);
    const [error, setError] = useState('');

const fetchPlayerInfo = async () => {
    try {
      const data = await getPlayerInfoByName(playerId);
      setPlayerData(data);
      setError('');
    } catch (error) {
      setError('Erro ao obter informações do jogador.');
      setPlayerData(null);
    }
  };

  return (
    <div>
      <Button color="red" onClick={fetchPlayerInfo}>
        Custom Button
      </Button>
    </div>
  );
};

export default PlayerInfo;
