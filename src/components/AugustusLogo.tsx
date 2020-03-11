import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/wreath.svg';

interface LogoProps {
    color?: string;
}

const AugustusLogo: React.FC<LogoProps> = ({ color = 'white' }) => {
    return (
        <LogoContainer>
            <StyledLogo color={color} />
            <StyledLogoName color={color}>augustus</StyledLogoName>
        </LogoContainer>
    );
};

export default AugustusLogo;

const LogoContainer = styled.div`
    flex-grow: 1;
    white-space: nowrap;
`;

const StyledLogo = styled(Logo)<LogoProps>`
    fill: ${props => props.color};
    vertical-align: middle;
    width: 30px;
    height: 30px;
    margin-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledLogoName = styled.h2<LogoProps>`
    display: inline-block;
    vertical-align: middle;
    font-family: ${({ theme }) => theme.typography.logo.fontFamily};
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
    color: ${props => props.color};
    margin: 0;
`;
