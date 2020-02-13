import React from 'react';
import { Avatar } from 'antd';
import getRandomTextAndBackgroundColorPair from 'utils/getRandomTextAndBackgroundColorPair';
import styled from 'styled-components';

interface AvatarProps {
    color: string;
    bgcolor: string;
}

interface UserAvatarProps {
    userName?: string;
}

const StyledAvatar = styled(Avatar)<AvatarProps>`
    color: ${props => props.color};
    background-color: ${props => props.bgcolor};
`;

const UserAvatar: React.FC<UserAvatarProps> = ({ userName = 'default' }) => {
    const { textColor, bgColor } = getRandomTextAndBackgroundColorPair(userName);
    const avatarText = userName[0].toLocaleUpperCase();

    return (
        <StyledAvatar color={textColor} bgcolor={bgColor}>
            {avatarText}
        </StyledAvatar>
    );
};

export default UserAvatar;
