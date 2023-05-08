import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import styled from 'styled-components';

import {TeamOverview, Teams, UserOverview} from './pages';

const Container = styled.div`
    flex: 1;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const App = () => {
    var router = createBrowserRouter([
        {
            path: '/',
            element: <Teams />,
        },
        {
            path: '/team/:teamId',
            element: <TeamOverview />,
        },
        {
            path: '/user/:useId',
            element: <UserOverview />,
        },
    ]);
    return (
        <Container>
            <RouterProvider router={router} />
        </Container>
    );
};

export default App;
