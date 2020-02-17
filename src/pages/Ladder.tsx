import React from 'react';
import AppLayout from 'components/AppLayout';
import SectionHeader from 'components/SectionHeader';
import LadderRankings from 'components/LadderRankings';
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
        <SectionHeader title="Rankings" subtitle="View player rankings" avatarIcon="trophy">
            <LadderRankings users={data?.ladder?.users || []} />
        </SectionHeader>
    );

    return <AppLayout>{toRender}</AppLayout>;
};

export default Ladder;
