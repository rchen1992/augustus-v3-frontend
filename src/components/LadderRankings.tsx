import React from 'react';
import styled from 'styled-components';
import { Table, Spin } from 'antd';
import { ColumnProps } from 'antd/es/table';
import {
    GetLadderRankingsQuery,
    useGetLadderRankingsQuery,
    LadderUsersOrderBy,
} from 'graphql/generated';
import RatingDelta from 'components/RatingDelta';
import AvatarAndUsername from 'components/AvatarAndUsername';
import formatDate from 'utils/formatDate';

type GetLadderRankingsQueryUser = NonNullable<GetLadderRankingsQuery['ladder']>['users'][0];
type GetLadderRankingsQueryUserColumn = GetLadderRankingsQueryUser & { key: string };

interface LadderRankingsProps {
    ladderId: string;
}

const columns: ColumnProps<GetLadderRankingsQueryUserColumn>[] = [
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

const LadderRankings: React.FC<LadderRankingsProps> = ({ ladderId }) => {
    const { loading, data } = useGetLadderRankingsQuery({
        variables: {
            id: ladderId,
            ladderUsersOrderBy: LadderUsersOrderBy.RankDesc,
        },
    });

    if (loading) {
        return (
            <SpinContainer>
                <Spin />
            </SpinContainer>
        );
    }

    const users = data?.ladder?.users
        ? data.ladder.users.map(user => ({ ...user, key: user.id }))
        : [];

    return <Table columns={columns} dataSource={users} pagination={false} size="middle" bordered />;
};

export default LadderRankings;

const RatingWrapper = styled.div`
    display: flex;
`;

const RatingValue = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing(0)};
`;

const SpinContainer = styled.div`
    text-align: center;
`;
