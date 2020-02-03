import React from 'react';
import styled from 'styled-components';
import { PageHeader } from 'antd';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    action?: React.ReactNode;
    avatarIcon: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    children,
    title,
    subtitle,
    action,
    avatarIcon,
}) => {
    return (
        <StyledPageHeader
            title={title}
            subTitle={subtitle}
            extra={action}
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
