import React from 'react';
import AppLayout from 'components/AppLayout';
import UserLadders from 'components/UserLadders';
import UserMatches from 'components/UserMatches';
import SectionHeader from 'components/SectionHeader';
import media from 'style/media';
import styled from 'styled-components';
import { Icon } from 'antd';
import { ReactComponent as LadderSvg } from 'assets/ladder.svg';
import { ReactComponent as VsSvg } from 'assets/vs.svg';
import NewLadderModal from 'components/NewLadderModal';

function Home() {
    const LadderIcon = <Icon component={LadderSvg} />;
    const VsIcon = <Icon component={VsSvg} />;

    return (
        <AppLayout>
            <Container>
                <SectionHeader
                    title="My Ladders"
                    subtitle="View and manage your ladders"
                    action={<NewLadderModal />}
                    avatarIcon={LadderIcon}
                >
                    <UserLadders />
                </SectionHeader>

                <UserMatchesSection>
                    <SectionHeader
                        title="My Matches"
                        subtitle="View all your latest matches"
                        avatarIcon={VsIcon}
                    >
                        <UserMatches />
                    </SectionHeader>
                </UserMatchesSection>
            </Container>
        </AppLayout>
    );
}

export default Home;

const Container = styled.div`
    ${media.sm`
        padding: ${({ theme }) => theme.spacing(2, 4)};
    `}

    ${media.smd`
        padding: 0;
    `}

    ${media.mlg`
        padding: ${({ theme }) => theme.spacing(2, 4)};
    `};

    ${media.lg`
        padding: 0;
    `};
`;

const UserMatchesSection = styled.div`
    margin-top: ${({ theme }) => theme.spacing(4)};
`;
