import React from 'react';
import AppLayout from 'components/AppLayout';
import SectionHeader from 'components/SectionHeader';
import LadderRankings from 'components/LadderRankings';
import LadderMatches from 'components/LadderMatches';
import media from 'style/media';
import styled from 'styled-components';
import { useGetLadderPageQuery, LadderUsersOrderBy } from 'graphql/generated';
import FullscreenSpin from 'components/FullscreenSpin';
import { useParams } from 'react-router-dom';

const Ladder = () => {
    const { ladderId } = useParams();
    const { loading, data } = useGetLadderPageQuery({
        variables: {
            id: ladderId!,
            ladderUsersOrderBy: LadderUsersOrderBy.RankDesc,
        },
    });

    const toRender = loading ? (
        <FullscreenSpin />
    ) : (
        <>
            <SectionHeader title="Rankings" subtitle="View player rankings" avatarIcon="trophy">
                <LadderRankings users={data?.ladder?.users || []} />
            </SectionHeader>
            <LadderMatchesSection>
                <SectionHeader title="Matches" subtitle="View ladder matches" avatarIcon="team">
                    <LadderMatches matches={data?.ladder?.matches || []} />
                </SectionHeader>
            </LadderMatchesSection>
        </>
    );

    return <AppLayout>{toRender}</AppLayout>;
};

export default Ladder;

const LadderMatchesSection = styled.div`
    margin-top: ${({ theme }) => theme.spacing(4)};
`;
