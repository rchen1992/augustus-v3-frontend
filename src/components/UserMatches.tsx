import React from 'react';
import { useGetMyMatchesQuery } from 'graphql/generated';
import styled from 'styled-components';
import media from 'style/media';
import { Empty, Spin, List, Avatar, Tag } from 'antd';
import { getMatchOpponent, getMatchResultText } from 'utils/match';
import colors from 'style/theme/colors';

const UserMatches: React.FC = () => {
    const { loading, data } = useGetMyMatchesQuery();

    const authedUserId = data?.me?.id;
    const matches = data?.me?.matches;

    if (loading || !matches || !authedUserId) {
        return (
            <SpinContainer>
                <Spin />
            </SpinContainer>
        );
    }

    if (matches.length === 0) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>You have no matches yet.</span>}
            ></Empty>
        );
    }

    return (
        <List
            bordered
            itemLayout="horizontal"
            dataSource={matches}
            renderItem={match => {
                const opponent = getMatchOpponent(match, authedUserId);
                const matchDate = new Date(parseInt(match.createdAt!));
                const matchResultText = getMatchResultText(match, authedUserId);
                const matchResultColor =
                    matchResultText === 'Win'
                        ? colors.primary
                        : matchResultText === 'Loss'
                        ? colors.red
                        : colors.gray(6);

                return (
                    <List.Item
                        extra={
                            <ListItemExtra>
                                <ListItemDescription>
                                    {matchDate.toLocaleDateString()}
                                </ListItemDescription>
                                <MatchResultTag color={matchResultColor}>
                                    {matchResultText}
                                </MatchResultTag>
                            </ListItemExtra>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={opponent.avatarUrl || undefined} />}
                            title={<ListItemTitle>VS - {opponent.userName}</ListItemTitle>}
                            description={match.ladder.ladderName}
                        />
                    </List.Item>
                );
            }}
        />
    );
};

export default UserMatches;

const SpinContainer = styled.div`
    text-align: center;
`;

const ListItemTitle = styled.span`
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const ListItemExtra = styled.div`
    text-align: right;
`;

const ListItemDescription = styled.div`
    color: ${({ theme }) => theme.colors.textGray};
`;

const MatchResultTag = styled(Tag)`
    margin-right: 0;
    margin-top: ${({ theme }) => theme.spacing(0)};
`;
