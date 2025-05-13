import React, { useState } from 'react';
import '../App.css';
import ServerForm from './ServerForm';
import ServerOptions from './ServerOptions';
import { validateMemoryInput, determineServerModels } from '../utils/serverUtils';

export interface HardwareConfig {
  cpu: '' | 'X86' | 'Power' | 'ARM';
  memorySizes: number[];
  hasGpu: boolean;
}

export interface ServerModel {
  id: number;
  name: string;
}

function ServerConfigurator() {
  const [possibleModels, setPossibleModels] = useState<ServerModel[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFormSubmit = (cpu: string, memoryInput: string, hasGpu: boolean) => {
    const memoryValidationResult = validateMemoryInput(memoryInput);

    if (typeof memoryValidationResult === 'string') {
      setErrorMessage(memoryValidationResult);
      setPossibleModels([]);
      return;
    }

    const config: HardwareConfig = {
      cpu: cpu as '' | 'X86' | 'Power' | 'ARM',
      memorySizes: memoryValidationResult,
      hasGpu,
    };

    if (config.memorySizes.length > 0 || hasGpu) {
      const models = determineServerModels(config);
      if (models.length > 0) {
        setPossibleModels(models);
        setErrorMessage('');
      } else {
        setPossibleModels([]);
        setErrorMessage('No Options');
      }
    } else {
      setPossibleModels([]);
      setErrorMessage('Please enter at least one valid memory size or select GPU.');
    }
  };

  return (
    <div className="container">
      <h2>Server Model Options</h2>
      <ServerForm onFormSubmit={handleFormSubmit} />
      <hr />
      <ServerOptions possibleModels={possibleModels} errorMessage={errorMessage} />
    </div>
  );
}

export default ServerConfigurator;