import React, { useState } from 'react';
import { getDinoInfoByName } from '@/shared/services/dinoService'
import { Button } from '@/shared/components/ui/button';


const DinoInfo = () => {
    const [DinoId, setDinoId] = useState('');
    const [DinoData, setDinoData] = useState<any>(null);
    const [error, setError] = useState('');

const fetchDinoInfo = async () => {
    try {
      const data = await getDinoInfoByName(DinoId);
      setDinoData(data);
      setError('');
    } catch (error) {
      setError('Erro ao obter informações do jogador.');
      setDinoData(null);
    }
  };

  return (
    <div>
      <Button color="red" onClick={fetchDinoInfo}>
        Custom Button
      </Button>
    </div>
  );
};

export default DinoInfo;
