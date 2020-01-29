import React from 'react';
import GET_USER_LADDERS from 'queries/getUserLadders';
import { useQuery } from '@apollo/react-hooks';

function Home() {
    const { loading, data } = useQuery(GET_USER_LADDERS);

    if (loading) {
        return <div>Loading user ladders!</div>;
    }

    return (
        <div>
            <header>Home Page!</header>
            <div>{JSON.stringify(data.me.ladders)}</div>
        </div>
    );
}

export default Home;
