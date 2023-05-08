import React, {ChangeEvent} from 'react';

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({onChange}: Props) => {
    return <input type="text" onChange={onChange} />;
};

export default Search;
