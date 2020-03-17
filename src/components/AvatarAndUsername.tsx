import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import media from 'style/media';

interface AvatarAndUsernameProps {
    avatarUrl?: string | null;
    userName: string;
    hideAvatarOnMobile?: boolean;
}

interface WrapperProps {
    hideAvatarOnMobile?: boolean;
}

const AvatarAndUsername: React.FC<AvatarAndUsernameProps> = ({
    avatarUrl,
    userName,
    hideAvatarOnMobile = true,
}) => {
    return (
        <span>
            <AvatarWrapper hideAvatarOnMobile={hideAvatarOnMobile}>
                <Avatar src={avatarUrl || undefined} />
            </AvatarWrapper>
            <UsernameWrapper hideAvatarOnMobile={hideAvatarOnMobile}>{userName}</UsernameWrapper>
        </span>
    );
};

export default AvatarAndUsername;

const AvatarWrapper = styled.span<WrapperProps>`
    display: ${props => (props.hideAvatarOnMobile ? 'none' : 'inline-block')};

    ${media.sm`
        display: inline-block;
    `}
`;

const UsernameWrapper = styled.span<WrapperProps>`
    margin-left: ${props => (props.hideAvatarOnMobile ? '0' : props.theme.spacing(1))};

    ${media.sm`
        margin-left: ${({ theme }) => theme.spacing(1)};
    `}
`;
