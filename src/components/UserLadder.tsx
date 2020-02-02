import React from 'react';
import { GetUserLaddersQuery } from 'graphql/generated';
import { Icon, Card, message } from 'antd';
import styled from 'styled-components';

type GetUserLaddersQueryLadder = NonNullable<GetUserLaddersQuery['me']>['ladders'][0];

interface UserLadderProps {
    ladder: GetUserLaddersQueryLadder;
}

const showCopyLinkMessage = () => {
    message.success('Invite link copied! Send it to whoever you want to join your ladder.', 4);
};

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
                    <LadderNameCutoff>
                        <LadderName>{ladderName}</LadderName>
                    </LadderNameCutoff>
                </Header>
            }
            actions={[
                <Action onClick={showCopyLinkMessage}>
                    <Icon type="usergroup-add" />
                    <ActionText>Copy Invite Link</ActionText>
                </Action>,
                <Action>
                    <Icon type="eye" />
                    <ActionText>View</ActionText>
                </Action>,
            ]}
        >
            <OverlapWrapper>
                <ColMiniCard>
                    <RankLabel>Rank</RankLabel>
                    <Rank>
                        {userRank}
                        <RankSuffix>st</RankSuffix>
                    </Rank>
                </ColMiniCard>
                <ColMiniCard>
                    <RatingContainer>
                        <RatingLabel>Rating: </RatingLabel>
                        <div>
                            <Rating>{userRating}</Rating>
                            <RatingDelta>
                                {ratingIcon}
                                <RatingDiff>({ratingDelta})</RatingDiff>
                            </RatingDelta>
                        </div>
                        <EmptyFlexPlaceholder></EmptyFlexPlaceholder>
                    </RatingContainer>
                </ColMiniCard>
            </OverlapWrapper>
            <StatsCard>
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
            </StatsCard>
        </StyledCard>
    );
};

export default UserLadder;

/**
|--------------------------------------------------
| Style
|--------------------------------------------------
*/

/**
 * Amount of extra padding to add to top of card body to make room
 * for absolutely positioned overlap card.
 */
const CARD_BODY_OFFSET = '120px';
/**
 * Amount of px to shift overlap card upwards so it goes into the header.
 */
const CARD_OVERLAP_OFFSET = '-100px';
/**
 * Equal to card body padding. Used for absolutely positioned overlap card.
 */
const CARD_OVERLAP_PADDING = '24px';
const CARD_HEADER_HEIGHT = '160px';

const StyledCard = styled(Card)`
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.gray(1)};
    border-radius: ${({ theme }) => theme.shape.cardBorderRadius};

    .ant-card-body {
        position: relative;
        padding-top: ${CARD_BODY_OFFSET};
    }
`;

const Header = styled.div`
    padding: ${({ theme }) => theme.spacing(4)};
    height: ${CARD_HEADER_HEIGHT};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-top-left-radius: ${({ theme }) => theme.shape.cardBorderRadius};
    border-top-right-radius: ${({ theme }) => theme.shape.cardBorderRadius};
`;

const LadderName = styled.h2`
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    color: white;
`;

const LadderNameCutoff = styled.div`
    width: 90%;
`;

const MiniCard = styled.div`
    background-color: white;
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: 8px;
`;

const ColMiniCard = styled(MiniCard)`
    flex-basis: 48%;
`;

const OverlapWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: ${CARD_OVERLAP_OFFSET};
    padding: ${CARD_OVERLAP_PADDING};
    width: 100%;
`;

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
`;

const RankSuffix = styled.span`
    font-size: 20px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
`;

const RatingContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Rating = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 40px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
`;

const RatingLabel = styled.div`
    color: ${({ theme }) => theme.colors.gray(7)};
`;

const RatingDownIcon = styled(Icon)`
    color: red;
`;

const RatingUpIcon = styled(Icon)`
    color: green;
`;

const RatingDelta = styled.div`
    text-align: center;
`;

const RatingDiff = styled.span`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-left: ${({ theme }) => theme.spacing(0)};
`;

const StatsCard = styled(MiniCard)`
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

const EmptyFlexPlaceholder = styled.div``;

const Action = styled.div`
    i {
        vertical-align: middle;
    }
`;

const ActionText = styled.span`
    margin-left: ${({ theme }) => theme.spacing(1)};
`;
