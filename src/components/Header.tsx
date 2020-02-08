import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';
import LogMatchModal from 'components/LogMatchModal';
import { ReactComponent as Logo } from 'assets/wreath.svg';

const Header: React.FC = () => {
    return (
        <Container>
            <LogoContainer>
                <StyledLogo />
                <StyledLogoName>augustus</StyledLogoName>
            </LogoContainer>
            <ControlsWrapper>
                <LogMatchModal />
                <Avatar />
            </ControlsWrapper>
        </Container>
    );
};

export default Header;

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.colors.primary};

    -webkit-box-shadow: 0px 3px 10px 0px rgba(138, 138, 138, 0.82);
    -moz-box-shadow: 0px 3px 10px 0px rgba(138, 138, 138, 0.82);
    box-shadow: 0px 3px 10px 0px rgba(138, 138, 138, 0.82);
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
    margin: 0;
`;

const ControlsWrapper = styled.div``;
