import React, { useState } from 'react';
import { useGetMyMatchesQuery, GetMyMatchesQuery } from 'graphql/generated';
import styled from 'styled-components';
import { Empty, Spin, List, Avatar, Tag, Button } from 'antd';
import { getMatchOpponent, getMatchResultText } from 'utils/match';
import colors from 'style/theme/colors';
import { USER_MATCHES_DEFAULT_LIMIT } from 'utils/constants';

const UserMatches: React.FC = () => {
    const [lastFetchedPage, setLastFetchedPage] = useState(0);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const { loading, data, fetchMore } = useGetMyMatchesQuery({
        variables: {
            offset: 0,
            limit: USER_MATCHES_DEFAULT_LIMIT,
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

    const fetchPage = (newPage: number) => {
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
    };

    const onLoadMore = async () => {
        setFetchMoreLoading(true);
        await fetchPage(lastFetchedPage + 1);
        setLastFetchedPage(lastFetchedPage + 1);
        setFetchMoreLoading(false);
    };

    const loadMoreButton = !hasFetchedAll ? (
        <LoadMoreContainer>
            <Button onClick={onLoadMore} loading={fetchMoreLoading}>
                See more
            </Button>
        </LoadMoreContainer>
    ) : null;

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
            loadMore={loadMoreButton}
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

const LoadMoreContainer = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.spacing(2)};
`;
