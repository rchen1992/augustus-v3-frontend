import React from 'react';
import { Avatar } from 'antd';
import { useAuth0 } from 'providers/Auth0Provider';
import getRandomTextAndBackgroundColorPair from 'utils/getRandomTextAndBackgroundColorPair';
import styled from 'styled-components';

interface AvatarProps {
    color: string;
    bgcolor: string;
}

const StyledAvatar = styled(Avatar)<AvatarProps>`
    color: ${props => props.color};
    background-color: ${props => props.bgcolor};
    margin-left: ${({ theme }) => theme.spacing(1)};
`;

const UserAvatar: React.FC = () => {
    const { user } = useAuth0();

    const { textColor, bgColor } = getRandomTextAndBackgroundColorPair(user!.nickname!);
    const avatarText = user!.nickname![0].toLocaleUpperCase();

    return (
        <StyledAvatar color={textColor} bgcolor={bgColor}>
            {avatarText}
        </StyledAvatar>
    );
};

export default UserAvatar;
