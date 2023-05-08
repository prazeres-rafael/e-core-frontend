import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.restoreAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([]);

        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });
    });

    it('should render teams list', async () => {
        const mockTeams = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];

        jest.spyOn(API, 'getTeams').mockResolvedValue(mockTeams);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });
});
