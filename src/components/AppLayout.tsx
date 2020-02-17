import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import media from 'style/media';

const Main = styled.main`
    padding: ${({ theme }) => theme.spacing(2)};

    ${media.md`
        padding: ${({ theme }) => theme.spacing(4)};
    `}
`;

const AppLayout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
};

export default AppLayout;
