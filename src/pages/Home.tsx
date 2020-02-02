import React from 'react';
import { useGetUserLaddersQuery } from 'graphql/generated';
import AppLayout from 'components/AppLayout';
import UserLadders from 'components/UserLadders';
import media from 'style/media';
import styled from 'styled-components';

const Container = styled.div`
    ${media.sm`
        padding: ${({ theme }) => theme.spacing(2, 4)};
    `}

    ${media.smd`
        padding: 0;
    `}

    ${media.mlg`
        padding: ${({ theme }) => theme.spacing(2, 4)};
    `};

    ${media.lg`
        padding: 0;
    `};
`;

function Home() {
    return (
        <AppLayout>
            <Container>
                <div>Home Page!</div>
                <UserLadders />
            </Container>
        </AppLayout>
    );
}

export default Home;
