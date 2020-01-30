import React from 'react';
import styled from 'styled-components';

// This is the way to import a standalone SVG file as a react component.
import { ReactComponent as Logo } from 'assets/wreath.svg';

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.primary};
`;

const LogoContainer = styled.div`
    flex-grow: 1;
    white-space: nowrap;
`;

const StyledLogo = styled(Logo)`
    fill: white;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    margin-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledLogoName = styled.h2`
    display: inline-block;
    vertical-align: middle;
    font-family: ${({ theme }) => theme.typography.logo.fontFamily};
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
    color: white;
`;

const Header: React.FC = () => {
    return (
        <Container>
            <LogoContainer>
                <StyledLogo />
                <StyledLogoName>augustus</StyledLogoName>
            </LogoContainer>
        </Container>
    );
};

export default Header;
