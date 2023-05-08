import React from 'react';
import {useLocation} from 'react-router-dom';
import {UserData} from 'types';

import {Card, Header} from '../components';

const mapUserToCard = (user: UserData) => {
    const columns = [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = () => {
    const location = useLocation();
    const {firstName, lastName} = location.state;

    return (
        <React.Fragment>
            <Header title={`User ${firstName} ${lastName}`} />
            {mapUserToCard(location.state)}
        </React.Fragment>
    );
};

export default UserOverview;
