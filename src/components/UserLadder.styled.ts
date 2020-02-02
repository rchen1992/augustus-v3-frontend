import styled from 'styled-components';
import { Icon, Card } from 'antd';

/**
 * Amount of extra padding to add to top of card body to make room
 * for absolutely positioned overlap card.
 */
export const CARD_BODY_OFFSET = '120px';
/**
 * Amount of px to shift overlap card upwards so it goes into the header.
 */
export const CARD_OVERLAP_OFFSET = '-100px';
/**
 * Equal to card body padding. Used for absolutely positioned overlap card.
 */
export const CARD_OVERLAP_PADDING = '24px';
export const CARD_HEADER_HEIGHT = '160px';

export const StyledCard = styled(Card)`
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.gray(1)};
    border-radius: ${({ theme }) => theme.shape.cardBorderRadius};

    .ant-card-body {
        position: relative;
        padding-top: ${CARD_BODY_OFFSET};
    }
`;

export const Header = styled.div`
    padding: ${({ theme }) => theme.spacing(4)};
    height: ${CARD_HEADER_HEIGHT};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-top-left-radius: ${({ theme }) => theme.shape.cardBorderRadius};
    border-top-right-radius: ${({ theme }) => theme.shape.cardBorderRadius};
`;

export const LadderName = styled.h2`
    margin-bottom: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    color: white;
`;

export const MiniCard = styled.div`
    background-color: white;
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: 8px;
`;

export const ColMiniCard = styled(MiniCard)`
    flex-basis: 48%;
`;

export const OverlapWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: ${CARD_OVERLAP_OFFSET};
    padding: ${CARD_OVERLAP_PADDING};
    width: 100%;
`;

export const Rank = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 80px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
    text-align: center;
`;

export const RankLabel = styled.div`
    color: ${({ theme }) => theme.colors.gray(7)};
    text-align: center;
    position: relative;
`;

export const RankSuffix = styled.span`
    font-size: 20px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
`;

export const RatingContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const Rating = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 40px;
    font-family: ${({ theme }) => theme.typography.ranking.fontFamily};
`;

export const RatingLabel = styled.div`
    color: ${({ theme }) => theme.colors.gray(7)};
`;

export const RatingDownIcon = styled(Icon)`
    color: red;
`;

export const RatingUpIcon = styled(Icon)`
    color: green;
`;

export const RatingDelta = styled.div`
    text-align: center;
`;

export const RatingDiff = styled.span`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-left: ${({ theme }) => theme.spacing(0)};
`;

export const StatsCard = styled(MiniCard)`
    display: flex;
    justify-content: center;
`;

export const Stat = styled.span`
    text-align: center;
    padding: ${({ theme }) => theme.spacing(null, 2)};

    :first-child {
        border-left: none;
    }
`;

export const StatLabel = styled.div`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-bottom: ${({ theme }) => theme.spacing(0)};
`;

export const StatValue = styled.div`
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const EmptyFlexPlaceholder = styled.div``;
