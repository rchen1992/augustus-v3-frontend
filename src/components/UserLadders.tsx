import React from 'react';
import { useGetMyLaddersQuery } from 'graphql/generated';
import UserLadder from 'components/UserLadder';
import styled from 'styled-components';
import media from 'style/media';
import { Empty, Button, Spin } from 'antd';
import GenericError from 'components/GenericError';

const UserLadders: React.FC = () => {
    const { loading, error, data } = useGetMyLaddersQuery();

    const userLadders = data?.me?.userLadders;

    if (loading) {
        return (
            <SpinContainer>
                <Spin />
            </SpinContainer>
        );
    }

    if (error || !userLadders) {
        return <GenericError message="There was an error getting your ladders." />;
    }

    if (userLadders.length === 0) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>You have no ladders. Create your first one now!</span>}
            >
                <Button type="primary">Create Now</Button>
            </Empty>
        );
    }

    const userLadderComponents = userLadders.map(userLadder => {
        return <UserLadder key={userLadder.id} userLadder={userLadder} />;
    });

    return <Container>{userLadderComponents}</Container>;
};

export default UserLadders;

const Container = styled.div`
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing(2)};

    ${media.sm`
        grid-gap: ${({ theme }) => theme.spacing(4)};
    `}

    ${media.smd`
        grid-template-columns: 1fr 1fr;
        grid-gap: ${({ theme }) => theme.spacing(2)};
    `}

    ${media.mlg`
        grid-gap: ${({ theme }) => theme.spacing(4)};
    `}

    ${media.lg`
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: ${({ theme }) => theme.spacing(3)};
    `}

    ${media.xl`
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: ${({ theme }) => theme.spacing(4)};
    `}
`;

const SpinContainer = styled.div`
    text-align: center;
`;
