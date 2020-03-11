import React from 'react';
import styled from 'styled-components';
import LogMatchModal from 'components/LogMatchModal';
import AccountMenu from 'components/AccountMenu';
import AugustusLogo from 'components/AugustusLogo';
import { ReactComponent as Logo } from 'assets/wreath.svg';
import { useAuth0 } from 'providers/Auth0Provider';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useGetMeQuery } from 'graphql/generated';

const Header: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const { data } = useGetMeQuery();

    return (
        <Container>
            <Link to="/">
                <AugustusLogo />
            </Link>
            {isAuthenticated && (
                <ControlsWrapper>
                    <LogMatchModal />
                    <AccountMenu>
                        <StyledAvatar icon="user" src={data?.me?.avatarUrl || undefined} />
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

const ControlsWrapper = styled.div``;

const StyledAvatar = styled(Avatar)`
    margin-left: ${({ theme }) => theme.spacing(1)};
    cursor: pointer;
`;
