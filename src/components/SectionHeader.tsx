import React from 'react';
import styled from 'styled-components';
import { PageHeader, Button, Icon } from 'antd';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    actionText?: string;
    actionIcon?: string;
    onAction?: () => void;
    avatarIcon: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    children,
    title,
    subtitle,
    actionText,
    actionIcon,
    onAction,
    avatarIcon,
}) => {
    return (
        <StyledPageHeader
            title={title}
            subTitle={subtitle}
            extra={
                actionText &&
                onAction && (
                    <Button type="default" icon={actionIcon} onClick={onAction}>
                        {actionText}
                    </Button>
                )
            }
            avatar={{ icon: avatarIcon }}
        >
            {children}
        </StyledPageHeader>
    );
};

export default SectionHeader;

const StyledPageHeader = styled(PageHeader)`
    padding: 0;

    .ant-page-header-heading {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray(3)};
        padding-bottom: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }

    .ant-avatar {
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;
