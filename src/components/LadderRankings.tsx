import React from 'react';
import styled from 'styled-components';
import { Table, Avatar } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { GetLadderPageQuery } from 'graphql/generated';
import RatingDelta from 'components/RatingDelta';

type GetLadderPageQueryUser = NonNullable<GetLadderPageQuery['ladder']>['users'][0];
type GetLadderPageQueryUserColumn = GetLadderPageQueryUser & { key: string };

interface LadderRankingsProps {
    users: GetLadderPageQueryUser[];
}

const columns: ColumnProps<GetLadderPageQueryUserColumn>[] = [
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
    },
    {
        title: 'Player name',
        key: 'player_name',
        render(_, { userName, avatarUrl }) {
            return (
                <span>
                    <Avatar src={avatarUrl || undefined} />
                    <UsernameWrapper>{userName}</UsernameWrapper>
                </span>
            );
        },
    },
    {
        title: 'Rating',
        key: 'rating',
        render(_, { rating, ratingDelta }) {
            return (
                <RatingWrapper>
                    <RatingValue>{rating}</RatingValue>
                    <RatingDelta userRatingDelta={ratingDelta} />
                </RatingWrapper>
            );
        },
    },
    {
        title: 'Join date',
        key: 'join_date',
        render(_, { ladderJoinDate }) {
            if (!ladderJoinDate) {
                return '';
            }

            return new Date(parseInt(ladderJoinDate)).toLocaleDateString();
        },
    },
];

const LadderRankings: React.FC<LadderRankingsProps> = ({ users }) => {
    const data = users.map(user => ({ ...user, key: user.id }));

    return <Table columns={columns} dataSource={data} size="middle" pagination={false} />;
};

export default LadderRankings;

const UsernameWrapper = styled.span`
    margin-left: ${({ theme }) => theme.spacing(1)};
`;

const RatingWrapper = styled.div`
    display: flex;
`;

const RatingValue = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing(0)};
`;
