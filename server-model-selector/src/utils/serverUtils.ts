import { HardwareConfig, ServerModel } from '../components/ServerConfigurator';

const serverModels: ServerModel[] = [
  { id: 1, name: 'Tower Server' },
  { id: 2, name: '4U Rack Server' },
  { id: 3, name: 'Mainframe' },
  { id: 4, name: 'High Density Server' },
];

export const validateMemoryInput = (input: string): number[] | string => {
  const memoryValues = input.split(',').map(s => s.trim()).filter(s => s !== '');
  const parsedMemory: number[] = [];

  if (memoryValues.length === 0) {
    return [];
  }

  for (const value of memoryValues) {
    const memory = parseInt(value, 10);
    if (isNaN(memory)) {
      return 'Memory Size must be comma-separated integers.';
    }
    if (memory < 2048) {
      return 'Memory Size must not be lower than 2,048MB.';
    }
    if (memory % 1024 !== 0) {
      return 'Memory Size must be a multiple of 1024MB.';
    }
    if ((memory & (memory - 1)) !== 0) {
      return 'Memory Size must be a power of 2.';
    }
    if (memory < 4096 || memory > 8388608) {
      return 'Memory Size must be between 4,096MB and 8,388,608MB (inclusive).';
    }
    parsedMemory.push(memory);
  }
  return parsedMemory;
};

export const determineServerModels = (config: HardwareConfig): ServerModel[] => {
  const { cpu, memorySizes, hasGpu } = config;
  const matchedModels: Set<ServerModel> = new Set();

  if (hasGpu) {
    const meetsGpuRequirements = cpu === 'ARM' && memorySizes.some(mem => mem >= 524288);
    if (meetsGpuRequirements) {
      matchedModels.add(serverModels.find(model => model.name === 'High Density Server')!);
    }
    return Array.from(matchedModels);
  }

  if (cpu === 'Power') {
    matchedModels.add(serverModels.find(model => model.name === 'Tower Server')!);
    matchedModels.add(serverModels.find(model => model.name === '4U Rack Server')!);
    matchedModels.add(serverModels.find(model => model.name === 'Mainframe')!);
  } else if (cpu === 'X86' || cpu === 'ARM') {
    matchedModels.add(serverModels.find(model => model.name === 'Tower Server')!);
    matchedModels.add(serverModels.find(model => model.name === '4U Rack Server')!);
  }

  const memoryAboveThreshold = memorySizes.some(mem => mem >= 131072);
  if (!memoryAboveThreshold) {
    return Array.from(matchedModels).filter(model => model.name === 'Tower Server');
  }

  return Array.from(matchedModels);
};