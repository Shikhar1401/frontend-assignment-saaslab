import { render, screen, waitFor, act } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import KickstarterPage from '../src/pages/KickstarterPage';
import { fetchKickstarterProjects } from '../src/services/api';

jest.mock('../src/services/api');

describe('KickstarterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading state initially', () => {
    render(<KickstarterPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should render projects after fetching', async () => {
    const mockData = [
      { sNo: 0, percentageFunded: 186, amountPledged: 15823 },
      { sNo: 1, percentageFunded: 50, amountPledged: 10000 },
    ];

    fetchKickstarterProjects.mockResolvedValue(mockData);

    await act(async () => {
      render(<KickstarterPage />);
    });

    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByText(/186%/i)).toBeInTheDocument();
      expect(screen.getByText(/\$15,823/i)).toBeInTheDocument();
      expect(screen.getByText(/50%/i)).toBeInTheDocument();
      expect(screen.getByText(/\$10,000/i)).toBeInTheDocument();
    });
  });

  test('should display error message when fetch fails', async () => {
    fetchKickstarterProjects.mockRejectedValue(new Error('Network error'));

    await act(async () => {
      render(<KickstarterPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to load projects/i)).toBeInTheDocument();
    });
  });
});

