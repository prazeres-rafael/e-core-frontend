import React, {useState, useEffect, ChangeEvent} from 'react';
import {ListItem, Teams as TeamsList} from 'types';

import {getTeams as fetchTeams} from '../../api';
import {Header, List, Search} from '../../components';

const mapTeamsToListItems = (teams: TeamsList[]): ListItem[] => {
    return teams.map(team => {
        var columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredTeams, setFilteredTeams] = useState<TeamsList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTeams = await fetchTeams();
                setTeams(fetchedTeams);
                setFilteredTeams(fetchedTeams);
                setIsLoading(false);
            } catch (error) {
                Error('Error fetching teams:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const typedValue = event.target.value;
        const searchText = typedValue.toLowerCase();
        const searchResults = teams.filter(team => team.name.toLowerCase().includes(searchText));
        setFilteredTeams(searchResults);
    };

    return (
        <React.Fragment>
            <Header title="Teams" showBackButton={false} />
            <Search onChange={handleChange} />
            <List items={mapTeamsToListItems(filteredTeams)} isLoading={isLoading} />
        </React.Fragment>
    );
};

export default Teams;
