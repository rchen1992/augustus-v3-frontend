import React from 'react';
import { GetMyLaddersQuery } from 'graphql/generated';
import { Icon, Card, message } from 'antd';
import styled from 'styled-components';
import Rank from 'components/Rank';
import getInviteLink from 'utils/getInviteLink';
import RatingDelta from 'components/RatingDelta';
import { Link } from 'react-router-dom';

type GetMyLaddersQueryLadder = NonNullable<GetMyLaddersQuery['me']>['userLadders'][0];

interface UserLadderProps {
    userLadder: GetMyLaddersQueryLadder;
}

const UserLadder: React.FC<UserLadderProps> = props => {
    const {
        rank,
        rating,
        ratingDelta = 0,
        matchStats,
        ladder: { id, ladderName, inviteToken },
    } = props.userLadder;

    const copyInviteLink = () => {
        const link = getInviteLink(inviteToken);

        /**
         * document.execCommand('copy') requires an actual DOM element,
         * so we append a temporary input to the document body
         * with the link text in order to copy it.
         */
        const $tempInput = document.createElement('input');
        document.body.appendChild($tempInput);
        $tempInput.setAttribute('value', link);
        $tempInput.select();
        document.execCommand('copy');
        document.body.removeChild($tempInput);

        /**
         * Show toast.
         */
        message.success('Invite link copied! Send it to whoever you want to join your ladder.', 4);
    };

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
                <Action onClick={copyInviteLink}>
                    <Icon type="usergroup-add" />
                    <ActionText>Invite</ActionText>
                </Action>,
                <Action>
                    <Link to={`/ladders/${id}`}>
                        <Icon type="eye" />
                        <ActionText>View</ActionText>
                    </Link>
                </Action>,
            ]}
        >
            <OverlapWrapper>
                <ColMiniCard>
                    <Rank rank={rank} />
                </ColMiniCard>
                <ColMiniCard>
                    <RatingContainer>
                        <RatingLabel>Rating: </RatingLabel>
                        <RatingValue>
                            <Rating>{rating}</Rating>
                            <RatingDelta userRatingDelta={ratingDelta} />
                        </RatingValue>
                        <EmptyFlexPlaceholder></EmptyFlexPlaceholder>
                    </RatingContainer>
                </ColMiniCard>
            </OverlapWrapper>
            <StatsCard>
                <Stat>
                    <StatLabel>Matches</StatLabel>
                    <StatValue>{matchStats?.matchCount}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Wins</StatLabel>
                    <StatValue>{matchStats?.winCount}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Losses</StatLabel>
                    <StatValue>{matchStats?.lossCount}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>Ties</StatLabel>
                    <StatValue>{matchStats?.tieCount}</StatValue>
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

const RatingValue = styled.div`
    text-align: center;
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
