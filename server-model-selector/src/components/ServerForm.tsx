import React, { useState, ChangeEventHandler } from 'react';

interface ServerFormProps {
  onFormSubmit: (cpu: string, memoryInput: string, hasGpu: boolean) => void;
}

const ServerForm: React.FC<ServerFormProps> = ({ onFormSubmit }) => {
  const [cpu, setCpu] = useState<'X86' | 'Power' | 'ARM' | ''>('');
  const [memoryInput, setMemoryInput] = useState<string>('');
  const [hasGpu, setHasGpu] = useState<boolean>(false);

  const handleCpuChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCpu(event.target.value as 'X86' | 'Power' | 'ARM' | '');
  };

  const handleMemoryInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMemoryInput(event.target.value);
  };

  const handleGpuChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasGpu(event.target.checked);
  };

  const handleSubmit = () => {
    onFormSubmit(cpu, memoryInput, hasGpu);
  };

  return (
    <div>
    <div className="input-section" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px' }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="cpu">CPU:</label>
        <select id="cpu" value={cpu} onChange={handleCpuChange} style={{ width: '100%', padding: '4px' }}>
          <option value="">Select CPU</option>
          <option value="X86">X86</option>
          <option value="Power">Power</option>
          <option value="ARM">ARM</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="memory">Memory Size (MB):</label>
        <input
          type="text"
          id="memory"
          value={memoryInput}
          onChange={handleMemoryInputChange}
          placeholder="e.g., 4096, 8192"
          style={{ width: '100%', padding: '4px' }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label>
          <input
            type="checkbox"
            checked={hasGpu}
            onChange={handleGpuChange}
          /> GPU Accelerator Card
        </label>
      </div>
    </div>
    <button onClick={handleSubmit} style={{ padding: '10px 15px' }}>Submit</button>
    </div>
  );
};

export default ServerForm;