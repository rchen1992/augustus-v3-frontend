import React from 'react';
import { GetUserLaddersQuery } from 'graphql/generated';
import { Icon } from 'antd';
import * as S from './UserLadder.styled';

type GetUserLaddersQueryLadder = NonNullable<GetUserLaddersQuery['me']>['ladders'][0];

interface UserLadderProps {
    ladder: GetUserLaddersQueryLadder;
}

const UserLadder: React.FC<UserLadderProps> = props => {
    const { ladderName, userRank, userRating, userRatingDelta = 0 } = props.ladder;

    const ratingIcon =
        userRatingDelta === null || userRatingDelta >= 0 ? (
            <S.RatingUpIcon type="caret-up" />
        ) : (
            <S.RatingDownIcon type="caret-down" />
        );
    const ratingDelta =
        userRatingDelta && userRatingDelta >= 0 ? `+${userRatingDelta}` : userRatingDelta;

    return (
        <S.StyledCard
            cover={
                <S.Header>
                    <S.LadderName>{ladderName}</S.LadderName>
                </S.Header>
            }
            actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}
        >
            <S.OverlapWrapper>
                <S.ColMiniCard>
                    <S.RankLabel>Rank</S.RankLabel>
                    <S.Rank>
                        {userRank}
                        <S.RankSuffix>st</S.RankSuffix>
                    </S.Rank>
                </S.ColMiniCard>
                <S.ColMiniCard>
                    <S.RatingContainer>
                        <S.RatingLabel>Rating: </S.RatingLabel>
                        <div>
                            <S.Rating>{userRating}</S.Rating>
                            <S.RatingDelta>
                                {ratingIcon}
                                <S.RatingDiff>({ratingDelta})</S.RatingDiff>
                            </S.RatingDelta>
                        </div>
                        <S.EmptyFlexPlaceholder></S.EmptyFlexPlaceholder>
                    </S.RatingContainer>
                </S.ColMiniCard>
            </S.OverlapWrapper>
            <S.StatsCard>
                <S.Stat>
                    <S.StatLabel>Matches</S.StatLabel>
                    <S.StatValue>23</S.StatValue>
                </S.Stat>
                <S.Stat>
                    <S.StatLabel>Wins</S.StatLabel>
                    <S.StatValue>15</S.StatValue>
                </S.Stat>
                <S.Stat>
                    <S.StatLabel>Losses</S.StatLabel>
                    <S.StatValue>7</S.StatValue>
                </S.Stat>
                <S.Stat>
                    <S.StatLabel>Ties</S.StatLabel>
                    <S.StatValue>1</S.StatValue>
                </S.Stat>
            </S.StatsCard>
        </S.StyledCard>
    );
};

export default UserLadder;
