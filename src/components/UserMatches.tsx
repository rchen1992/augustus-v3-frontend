import React, { useState } from 'react';
import { useGetMyMatchesQuery, GetMyMatchesQuery } from 'graphql/generated';
import styled from 'styled-components';
import { Empty, Spin, List, Avatar, Tag, Button } from 'antd';
import { getMatchOpponent, getMatchResultText } from 'utils/match';
import colors from 'style/theme/colors';
import { USER_MATCHES_DEFAULT_LIMIT } from 'utils/constants';
import formatDate from 'utils/formatDate';
import useLoadMorePaginationButton from 'hooks/useLoadMorePaginationButton';

const UserMatches: React.FC = () => {
    const { loading, data, fetchMore } = useGetMyMatchesQuery({
        variables: {
            offset: 0,
            limit: USER_MATCHES_DEFAULT_LIMIT,
        },
    });

    const { loadMoreButton } = useLoadMorePaginationButton({
        fetchPage: (newPage: number) => {
            return fetchMore({
                /**
                 * By default, fetchMore will use the same
                 * variables of the original query.
                 */
                variables: {
                    offset: newPage * USER_MATCHES_DEFAULT_LIMIT,
                },
                /**
                 * Cache update function.
                 * We simply append the results to the end of
                 * the array of matches.
                 */
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult || !fetchMoreResult.me?.matches) {
                        return prev;
                    }

                    return {
                        ...prev,
                        me: {
                            ...prev.me,
                            matches: [...prev.me!.matches, ...fetchMoreResult.me.matches],
                        },
                    } as GetMyMatchesQuery;
                },
            });
        },
    });

    const authedUserId = data?.me?.id;
    const matches = data?.me?.matches;
    const matchCount = data?.me?.matchCount;

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

    const hasFetchedAll = matches.length >= matchCount!;

    return (
        <List
            bordered
            itemLayout="horizontal"
            dataSource={matches}
            renderItem={match => {
                const opponent = getMatchOpponent(match, authedUserId);
                const matchDate = formatDate(match.createdAt!);
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
                                <ListItemDescription>{matchDate}</ListItemDescription>
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
            loadMore={!hasFetchedAll ? loadMoreButton : null}
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
