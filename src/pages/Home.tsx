import React from 'react';
import { useGetUserLaddersQuery } from 'graphql/generated';
import AppLayout from 'components/AppLayout';
import UserLadders from 'components/UserLadders';

function Home() {
    return (
        <AppLayout>
            <div>Home Page!</div>
            <UserLadders />
        </AppLayout>
    );
}

export default Home;
