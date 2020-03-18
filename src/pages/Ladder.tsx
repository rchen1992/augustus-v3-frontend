import React from 'react';
import AppLayout from 'components/AppLayout';
import SectionHeader from 'components/SectionHeader';
import LadderRankings from 'components/LadderRankings';
import LadderMatches from 'components/LadderMatches';
import styled from 'styled-components';
import { useGetLadderNameQuery } from 'graphql/generated';
import { useParams } from 'react-router-dom';

const Ladder = () => {
    const { ladderId } = useParams();
    const { data } = useGetLadderNameQuery({
        variables: {
            id: ladderId!,
        },
    });

    return (
        <AppLayout>
            <LadderName>{data?.ladder?.ladderName}</LadderName>
            <SectionHeader title="Rankings" subtitle="View player rankings" avatarIcon="trophy">
                <LadderRankings ladderId={ladderId!} />
            </SectionHeader>
            <LadderMatchesSection>
                <SectionHeader title="Matches" subtitle="View ladder matches" avatarIcon="team">
                    <LadderMatches ladderId={ladderId!} />
                </SectionHeader>
            </LadderMatchesSection>
        </AppLayout>
    );
};

export default Ladder;

const LadderMatchesSection = styled.div`
    margin-top: ${({ theme }) => theme.spacing(4)};
`;

const LadderName = styled.h1`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
