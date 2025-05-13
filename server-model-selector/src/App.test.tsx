import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the input section and submit button', () => {
    render(<App />);
    expect(screen.getByLabelText('CPU:')).toBeInTheDocument();
    expect(screen.getByLabelText('Memory Size (MB):')).toBeInTheDocument();
    expect(screen.getByLabelText('GPU Accelerator Card')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('displays "No Options" for invalid initial memory input', async () => {
    render(<App />);
    const memoryInput = screen.getByLabelText('Memory Size (MB):');
    fireEvent.change(memoryInput, { target: { value: '1000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Memory Size must not be lower than 2,048MB.');
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('displays "No Options" when no server model matches (Example 1)', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('CPU:'), { target: { value: 'Power' } });
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '1024' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Memory Size must not be lower than 2,048MB.');
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('displays "Tower Server or 4U Rack Server or Mainframe" (Example 2)', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('CPU:'), { target: { value: 'Power' } });
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '262144' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Tower Server')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('4U Rack Server')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Mainframe')).toBeInTheDocument();
    });
  });

  it('displays "Tower Server or 4U Rack Server" (Example 3)', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('CPU:'), { target: { value: 'X86' } });
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '524288' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Tower Server')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('4U Rack Server')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.queryByText('Mainframe')).toBeNull();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.queryByText('High Density Server')).toBeNull();
    });
  });

  it('displays "High Density Server" (Example 4)', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('CPU:'), { target: { value: 'ARM' } });
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '524288' } });
    fireEvent.click(screen.getByLabelText('GPU Accelerator Card'));
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('High Density Server');
    expect(screen.queryByText('Tower Server')).toBeNull();
    expect(screen.queryByText('4U Rack Server')).toBeNull();
    expect(screen.queryByText('Mainframe')).toBeNull();
  });

  it('handles multiple valid memory inputs', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('CPU:'), { target: { value: 'X86' } });
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '4096, 8192' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(screen.getByText('Tower Server')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.queryByText('4U Rack Server')).toBeNull();
    });
  });

  it('shows error for non-numeric memory input', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Memory Size must be comma-separated integers.');
  });

  it('shows error for memory not a multiple of 1024', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '2050' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Memory Size must be a multiple of 1024MB.');
  });

  it('shows error for memory not a power of 2', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Memory Size (MB):'), { target: { value: '3072' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Memory Size must be a power of 2.');
  });

  it('shows error for memory out of range (below)', async () => {
    render(<App />);
    const memoryInput = screen.getByLabelText('Memory Size (MB):');
    fireEvent.change(memoryInput, { target: { value: '2048' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await screen.findByText('Memory Size must be between 4,096MB and 8,388,608MB (inclusive).');
  });

  it('shows error for memory out of range (above)', async () => {
    render(<App />);
    const memoryInput = screen.getByLabelText('Memory Size (MB):');
    fireEvent.change(memoryInput, { target: { value: '16777216' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toHaveTextContent('Memory Size must be between 4,096MB and 8,388,608MB (inclusive).');
    });
  });
});