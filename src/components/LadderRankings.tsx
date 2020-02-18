import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { GetLadderPageQuery } from 'graphql/generated';
import RatingDelta from 'components/RatingDelta';
import AvatarAndUsername from 'components/AvatarAndUsername';
import formatDate from 'utils/formatDate';

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
            return <AvatarAndUsername avatarUrl={avatarUrl} userName={userName} />;
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

            return formatDate(ladderJoinDate);
        },
    },
];

const LadderRankings: React.FC<LadderRankingsProps> = ({ users }) => {
    const data = users.map(user => ({ ...user, key: user.id }));

    return <Table columns={columns} dataSource={data} pagination={false} size="middle" bordered />;
};

export default LadderRankings;

const RatingWrapper = styled.div`
    display: flex;
`;

const RatingValue = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing(0)};
`;
