import React from 'react';
import { Table, Spin } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { GetLadderMatchesQuery, useGetLadderMatchesQuery } from 'graphql/generated';
import AvatarAndUsername from 'components/AvatarAndUsername';
import formatDate from 'utils/formatDate';
import styled from 'styled-components';
import useLoadMorePaginationButton from 'hooks/useLoadMorePaginationButton';
import { LADDER_MATCHES_DEFAULT_LIMIT } from 'utils/constants';
import GenericError from 'components/GenericError';

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
    const { loading, error, data, fetchMore } = useGetLadderMatchesQuery({
        variables: {
            id: ladderId,
            offset: 0,
            limit: LADDER_MATCHES_DEFAULT_LIMIT,
        },
    });

    const { loadMoreButton } = useLoadMorePaginationButton({
        fetchPage: (newPage: number) => {
            return fetchMore({
                variables: {
                    offset: newPage * LADDER_MATCHES_DEFAULT_LIMIT,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult || !fetchMoreResult.ladder?.matches) {
                        return prev;
                    }

                    return {
                        ...prev,
                        ladder: {
                            ...prev.ladder,
                            matches: [...prev.ladder!.matches, ...fetchMoreResult.ladder.matches],
                        },
                    } as GetLadderMatchesQuery;
                },
            });
        },
    });

    if (loading) {
        return (
            <CenterContainer>
                <Spin />
            </CenterContainer>
        );
    }

    if (error || !data?.ladder) {
        return <GenericError message="There was an error getting the ladder matches." />;
    }

    const matches = data.ladder.matches
        ? data.ladder.matches.map(match => ({ ...match, key: match.id }))
        : [];

    const fetchedAll = matches.length >= data.ladder.matchCount!;

    return (
        <Table
            columns={columns}
            dataSource={matches}
            size="small"
            pagination={false}
            footer={
                fetchedAll ? undefined : () => <CenterContainer>{loadMoreButton}</CenterContainer>
            }
        />
    );
};

export default LadderMatches;

const CenterContainer = styled.div`
    text-align: center;
`;
