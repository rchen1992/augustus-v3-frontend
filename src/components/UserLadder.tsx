import React from 'react';
import { GetUserLaddersQuery } from 'graphql/generated';
import { Card, Icon } from 'antd';
import styled from 'styled-components';

type GetUserLaddersQueryLadder = NonNullable<GetUserLaddersQuery['me']>['ladders'][0];

interface UserLadderProps {
    ladder: GetUserLaddersQueryLadder;
}

const StyledCard = styled(Card)`
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Header = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray(3)};
    padding: ${({ theme }) => theme.spacing(3)};
    text-align: center;
`;

const LadderName = styled.h2`
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const CardBody = styled.div``;

const Rank = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 80px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
    text-align: center;
`;

const RankLabel = styled.div`
    color: ${({ theme }) => theme.colors.gray(7)};
    text-align: center;
    position: relative;
    top: 10px;
`;

const RankSuffix = styled.span`
    font-size: 20px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
`;

const RatingContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    text-align: center;
`;

const Rating = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    margin-left: ${({ theme }) => theme.spacing(1)}px;
    margin-right: ${({ theme }) => theme.spacing(0)};
`;

const RatingLabel = styled.span`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-right: ${({ theme }) => theme.spacing(0)};
`;

const RatingDownIcon = styled(Icon)`
    color: red;
`;

const RatingUpIcon = styled(Icon)`
    color: green;
`;

const RatingDiff = styled.span`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-left: ${({ theme }) => theme.spacing(0)};
`;

const Stats = styled.div`
    display: flex;
    justify-content: center;
`;

const Stat = styled.span`
    text-align: center;
    padding: ${({ theme }) => theme.spacing(null, 2)};

    :first-child {
        border-left: none;
    }
`;

const StatLabel = styled.div`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-bottom: ${({ theme }) => theme.spacing(0)};
`;

const StatValue = styled.div`
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const UserLadder: React.FC<UserLadderProps> = props => {
    const { ladderName, userRank, userRating, userRatingDelta = 0 } = props.ladder;

    const ratingIcon =
        userRatingDelta === null || userRatingDelta >= 0 ? (
            <RatingUpIcon type="caret-up" />
        ) : (
            <RatingDownIcon type="caret-down" />
        );
    const ratingDelta =
        userRatingDelta && userRatingDelta >= 0 ? `+${userRatingDelta}` : userRatingDelta;

    return (
        <StyledCard
            cover={
                <Header>
                    <LadderName>{ladderName}</LadderName>
                </Header>
            }
            actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}
        >
            <CardBody>
                <RankLabel>Rank</RankLabel>
                <Rank>
                    {userRank}
                    <RankSuffix>st</RankSuffix>
                </Rank>
                <RatingContainer>
                    <RatingLabel>Rating: </RatingLabel>
                    <Rating>{userRating}</Rating> {ratingIcon}
                    <RatingDiff>({ratingDelta})</RatingDiff>
                </RatingContainer>
                <Stats>
                    <Stat>
                        <StatLabel>Matches</StatLabel>
                        <StatValue>23</StatValue>
                    </Stat>
                    <Stat>
                        <StatLabel>Wins</StatLabel>
                        <StatValue>15</StatValue>
                    </Stat>
                    <Stat>
                        <StatLabel>Losses</StatLabel>
                        <StatValue>7</StatValue>
                    </Stat>
                    <Stat>
                        <StatLabel>Ties</StatLabel>
                        <StatValue>1</StatValue>
                    </Stat>
                </Stats>
            </CardBody>
        </StyledCard>
    );
};

export default UserLadder;
