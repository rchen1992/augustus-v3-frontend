import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.main`
    padding: ${({ theme }) => theme.spacing(2)};
`;

const AppLayout: React.FC = ({ children }) => {
    return (
        <>
            <Header></Header>
            <Main>{children}</Main>
        </>
    );
};

export default AppLayout;
