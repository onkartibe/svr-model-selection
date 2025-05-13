import React from 'react';

interface ServerOptionsProps {
  possibleModels: { id: number; name: string }[];
  errorMessage: string;
}

const ServerOptions: React.FC<ServerOptionsProps> = ({ possibleModels, errorMessage }) => {
  return (
    <div className="output-section">
      <h3>Possible Server Models:</h3>
      {errorMessage && <p className="error" data-testid="error-message">{errorMessage}</p>}
      {possibleModels.length > 0 && (
        <ul>
          {possibleModels.map((model) => (
            <li key={model.id}>{model.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServerOptions;