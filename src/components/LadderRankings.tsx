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
import GenericError from 'components/GenericError';

type GetLadderRankingsQueryUser = NonNullable<GetLadderRankingsQuery['ladder']>['ladderUsers'][0];
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
        render(_, { user: { userName, avatarUrl } }) {
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
        render(_, { joinDate }) {
            if (!joinDate) {
                return '';
            }

            return formatDate(joinDate);
        },
    },
];

const LadderRankings: React.FC<LadderRankingsProps> = ({ ladderId }) => {
    const { loading, error, data } = useGetLadderRankingsQuery({
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

    if (error) {
        return <GenericError message="There was an error getting the ladder rankings." />;
    }

    const ladderUsers = data?.ladder?.ladderUsers
        ? data.ladder.ladderUsers.map(ladderUser => ({ ...ladderUser, key: ladderUser.id }))
        : [];

    return (
        <Container>
            <Table
                columns={columns}
                dataSource={ladderUsers}
                pagination={false}
                size="middle"
                bordered
            />
        </Container>
    );
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

const Container = styled.div`
    ${({ theme }) => theme.animations.fadeReveal}
`;
