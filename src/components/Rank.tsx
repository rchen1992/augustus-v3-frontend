import React from 'react';
import styled from 'styled-components';

interface RankProps {
    rank?: number | null;
}

const getRankSuffix = (rank?: number | null) => {
    if (!rank) {
        return '';
    }

    if (rank !== 11 && rank % 10 === 1) {
        return 'st';
    }

    if (rank !== 12 && rank % 10 === 2) {
        return 'nd';
    }

    if (rank !== 13 && rank % 10 === 3) {
        return 'rd';
    }

    return 'th';
};

const Rank: React.FC<RankProps> = ({ rank }) => {
    return (
        <>
            <RankLabel>Rank</RankLabel>
            <RankValue>
                {rank || '-'}
                <RankSuffix>{getRankSuffix(rank)}</RankSuffix>
            </RankValue>
        </>
    );
};

export default Rank;

const RankValue = styled.div`
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
