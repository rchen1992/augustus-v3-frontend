import React from 'react';
import { useGetUserLaddersQuery } from 'graphql/generated';
import AppLayout from 'components/AppLayout';

function Home() {
    const { loading, data } = useGetUserLaddersQuery();

    if (loading) {
        return <div>Loading user ladders!</div>;
    }

    return (
        <AppLayout>
            <div>Home Page!</div>
            <div>{JSON.stringify(data!.me!.ladders)}</div>
        </AppLayout>
    );
}

export default Home;
