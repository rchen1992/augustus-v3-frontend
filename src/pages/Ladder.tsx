import React from 'react';
import AppLayout from 'components/AppLayout';
import SectionHeader from 'components/SectionHeader';
import media from 'style/media';
import styled from 'styled-components';
import { Icon } from 'antd';
import { ReactComponent as LadderSvg } from 'assets/ladder.svg';
import { ReactComponent as VsSvg } from 'assets/vs.svg';

const Ladder = () => {
    return (
        <AppLayout>
            <div>Ladder page</div>
        </AppLayout>
    );
};

export default Ladder;

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
