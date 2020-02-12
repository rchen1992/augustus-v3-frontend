import React, { useState, useRef } from 'react';
import { useGetMyMatchesQuery, GetMyMatchesQuery } from 'graphql/generated';
import styled from 'styled-components';
import { Empty, Spin, List, Avatar, Tag } from 'antd';
import { getMatchOpponent, getMatchResultText } from 'utils/match';
import colors from 'style/theme/colors';
import { USER_MATCHES_DEFAULT_LIMIT } from 'utils/constants';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

const UserMatches: React.FC = () => {
    const [page, setPage] = useState(0);
    const itemStatusMap = useRef(new Set<number>());
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

    function loadMoreItems(startIndex: number, stopIndex: number) {
        return fetchMore({
            /**
             * By default, fetchMore will use the same
             * variables of the original query.
             */
            variables: {
                offset: startIndex,
                limit: stopIndex - startIndex,
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
    }

    const ItemRenderer = ({ index, style }: ListChildComponentProps) => {
        const match = matches[index];
        if (!match) {
            return <div>loading</div>;
        }
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
                style={style}
                extra={
                    <ListItemExtra>
                        <ListItemDescription>{matchDate.toLocaleDateString()}</ListItemDescription>
                        <MatchResultTag color={matchResultColor}>{matchResultText}</MatchResultTag>
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
    };

    return (
        <List
            bordered
            itemLayout="horizontal"
            // pagination={{
            //     onChange: page => {
            //         const newPage = page - 1;
            //         setPage(newPage);

            //         //     fetchMore({
            //         //         /**
            //         //          * By default, fetchMore will use the same
            //         //          * variables of the original query.
            //         //          */
            //         //         variables: {
            //         //             offset: newPage * USER_MATCHES_DEFAULT_LIMIT,
            //         //         },
            //         //         /**
            //         //          * Cache update function.
            //         //          * We simply append the results to the end of
            //         //          * the array of matches.
            //         //          */
            //         //         updateQuery: (prev, { fetchMoreResult }) => {
            //         //             if (!fetchMoreResult || !fetchMoreResult.me?.matches) {
            //         //                 return prev;
            //         //             }

            //         //             return {
            //         //                 ...prev,
            //         //                 me: {
            //         //                     ...prev.me,
            //         //                     matches: [
            //         //                         ...prev.me!.matches,
            //         //                         ...fetchMoreResult.me.matches,
            //         //                     ],
            //         //                 },
            //         //             } as GetMyMatchesQuery;
            //         //         },
            //         //     });
            //     },
            //     current: page + 1,
            //     total: matchCount!,
            //     showLessItems: true,
            //     pageSize: USER_MATCHES_DEFAULT_LIMIT,
            // }}
        >
            <AutoSizer disableHeight>
                {({ width }) => (
                    <InfiniteLoader
                        isItemLoaded={index => itemStatusMap.current.has(index)}
                        itemCount={1000}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            <FixedSizeList
                                height={500}
                                width={width}
                                itemCount={8}
                                itemSize={80}
                                onItemsRendered={onItemsRendered}
                                ref={ref}
                            >
                                {ItemRenderer}
                            </FixedSizeList>
                        )}
                    </InfiniteLoader>
                )}
            </AutoSizer>
        </List>
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
