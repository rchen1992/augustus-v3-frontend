import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

interface RatingDeltaProps {
    userRatingDelta?: number | null;
}

const RatingDelta: React.FC<RatingDeltaProps> = ({ userRatingDelta = 0 }) => {
    const ratingIcon =
        userRatingDelta === null || userRatingDelta >= 0 ? (
            <RatingUpIcon type="caret-up" />
        ) : (
            <RatingDownIcon type="caret-down" />
        );
    const ratingDelta =
        userRatingDelta && userRatingDelta >= 0 ? `+${userRatingDelta}` : userRatingDelta;

    return (
        <div>
            {ratingIcon}
            <RatingDiff>({ratingDelta})</RatingDiff>
        </div>
    );
};

export default RatingDelta;

const RatingDiff = styled.span`
    color: ${({ theme }) => theme.colors.gray(7)};
    margin-left: ${({ theme }) => theme.spacing(0)};
`;

const RatingDownIcon = styled(Icon)`
    color: red;
`;

const RatingUpIcon = styled(Icon)`
    color: green;
`;
