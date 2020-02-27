import React from 'react';
import styled from 'styled-components';
import LogMatchModal from 'components/LogMatchModal';
import AccountMenu from 'components/AccountMenu';
import { ReactComponent as Logo } from 'assets/wreath.svg';
import { useAuth0 } from 'providers/Auth0Provider';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <Container>
            <Link to="/">
                <LogoContainer>
                    <StyledLogo />
                    <StyledLogoName>augustus</StyledLogoName>
                </LogoContainer>
            </Link>
            {isAuthenticated && (
                <ControlsWrapper>
                    <LogMatchModal />
                    <AccountMenu>
                        <StyledAvatar src={user!.picture} />
                    </AccountMenu>
                </ControlsWrapper>
            )}
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

const StyledAvatar = styled(Avatar)`
    margin-left: ${({ theme }) => theme.spacing(1)};
    cursor: pointer;
`;
