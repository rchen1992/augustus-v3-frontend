import React from 'react';
import { Table, Spin } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { GetLadderMatchesQuery, useGetLadderMatchesQuery } from 'graphql/generated';
import AvatarAndUsername from 'components/AvatarAndUsername';
import formatDate from 'utils/formatDate';
import styled from 'styled-components';

type GetLadderMatchesQueryMatch = NonNullable<GetLadderMatchesQuery['ladder']>['matches'][0];
type GetLadderMatchesQueryMatchColumm = GetLadderMatchesQueryMatch & { key: string };

interface LadderMatchesProps {
    ladderId: string;
}

const columns: ColumnProps<GetLadderMatchesQueryMatchColumm>[] = [
    {
        title: 'Date',
        key: 'date',
        render(_, { createdAt }) {
            if (!createdAt) {
                return '';
            }

            return formatDate(createdAt);
        },
    },
    {
        title: 'Player 1',
        key: 'player_1',
        render(_, { user1: { userName, avatarUrl } }) {
            return <AvatarAndUsername avatarUrl={avatarUrl} userName={userName} />;
        },
    },
    {
        title: 'Player 2',
        key: 'player_2',
        render(_, { user2: { userName, avatarUrl } }) {
            return <AvatarAndUsername avatarUrl={avatarUrl} userName={userName} />;
        },
    },
    {
        title: 'Result',
        key: 'result',
        render(_, { winner, tied }) {
            if (tied) {
                return 'Tie';
            }

            return `${winner?.userName} won`;
        },
    },
];

const LadderMatches: React.FC<LadderMatchesProps> = ({ ladderId }) => {
    const { loading, data } = useGetLadderMatchesQuery({
        variables: {
            id: ladderId,
        },
    });

    if (loading) {
        return (
            <SpinContainer>
                <Spin />
            </SpinContainer>
        );
    }

    const matches = data?.ladder?.matches
        ? data.ladder.matches.map(match => ({ ...match, key: match.id }))
        : [];

    return <Table columns={columns} dataSource={matches} size="small" pagination={false} />;
};

export default LadderMatches;

const LoadMoreContainer = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.spacing(2)};
`;

const SpinContainer = styled.div`
    text-align: center;
`;
