import React from 'react';
import { useGetUserLaddersQuery } from 'graphql/generated';
import UserLadder from 'components/UserLadder';
import styled from 'styled-components';
import media from 'style/media';

const Container = styled.div`
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing(2)}};

    ${media.sm`
        grid-gap: ${({ theme }) => theme.spacing(4)}};
    `};

    ${media.smd`
        grid-template-columns: 1fr 1fr;
        grid-gap: ${({ theme }) => theme.spacing(2)}};
    `};

    ${media.mlg`
        grid-gap: ${({ theme }) => theme.spacing(4)}};
    `};

    ${media.lg`
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: ${({ theme }) => theme.spacing(3)}};
    `};

    ${media.xl`
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: ${({ theme }) => theme.spacing(4)}};
    `};
`;

const UserLadders: React.FC = () => {
    const { loading, data } = useGetUserLaddersQuery();

    if (loading) {
        return <div>Loading user ladders!</div>;
    }

    const ladders = data!.me!.ladders.map(ladder => {
        return <UserLadder key={ladder.id} ladder={ladder} />;
    });

    return <Container>{ladders}</Container>;
};

export default UserLadders;
