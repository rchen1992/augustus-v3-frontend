import React from 'react';
import { useGetUserLaddersQuery } from 'graphql/generated';

function Home() {
    const { loading, data } = useGetUserLaddersQuery();

    if (loading) {
        return <div>Loading user ladders!</div>;
    }

    return (
        <div>
            <header>Home Page!</header>
            <div>{JSON.stringify(data!.me!.ladders)}</div>
        </div>
    );
}

export default Home;
