import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

interface AvatarAndUsernameProps {
    avatarUrl?: string | null;
    userName: string;
}

const AvatarAndUsername: React.FC<AvatarAndUsernameProps> = ({ avatarUrl, userName }) => {
    return (
        <span>
            <Avatar src={avatarUrl || undefined} />
            <UsernameWrapper>{userName}</UsernameWrapper>
        </span>
    );
};

export default AvatarAndUsername;

const UsernameWrapper = styled.span`
    margin-left: ${({ theme }) => theme.spacing(1)};
`;
