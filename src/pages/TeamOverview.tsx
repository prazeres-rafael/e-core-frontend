import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';

import {getTeamOverview, getUserData} from '../api';
import {Card, List, Header} from '../components';

const mapUserToListItem = (user: UserData): ListItem => {
    const {id, firstName, lastName, displayName, location} = user;

    const columns = [
        {
            key: 'Name',
            value: `${firstName} ${lastName}`,
        },
        {
            key: 'Display Name',
            value: displayName,
        },
        {
            key: 'Location',
            value: location,
        },
    ];
    return {
        id,
        url: `/user/${id}`,
        columns,
        navigationProps: user,
    };
};

const mapTeamLeadToCard = (teamLead: UserData) => {
    const {id, firstName, lastName, displayName, location} = teamLead;

    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${firstName} ${lastName}`,
        },
        {
            key: 'Display Name',
            value: displayName,
        },
        {
            key: 'Location',
            value: location,
        },
    ];
    return <Card columns={columns} url={`/user/${id}`} navigationProps={teamLead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = useState<PageState>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filteredMembers, setFilteredMembers] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchTeamUsers = async () => {
            try {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);

                const teamMembers = await Promise.all(teamMemberIds.map(getUserData));

                setPageData({
                    teamLead,
                    teamMembers,
                });
                setFilteredMembers(teamMembers);
                setIsLoading(false);
            } catch (error) {
                Error('Error fetching team users:', error);
            }
        };

        fetchTeamUsers();
    }, [teamId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        const filtered = pageData?.teamMembers?.filter(
            member =>
                member.firstName.toLowerCase().includes(value.toLowerCase()) ||
                member.lastName.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredMembers(filtered || []);
    };

    return (
        <React.Fragment>
            <Header title={`Team ${location.state.name}`} />
            <input type="text" onChange={handleChange} />
            {!isLoading && mapTeamLeadToCard(pageData.teamLead)}
            <List items={filteredMembers.map(mapUserToListItem)} isLoading={isLoading} />
        </React.Fragment>
    );
};

export default TeamOverview;
