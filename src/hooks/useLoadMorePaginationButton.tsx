import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ApolloQueryResult } from 'apollo-boost';

interface Options {
    fetchPage: (newPage: number) => Promise<ApolloQueryResult<any>>;
    renderContainer?: boolean;
}

/**
 * Custom hook used to handle sequential loading of additional pages of data.
 * Returns a load more button and keeps track of page fetch and loading state.
 */
export default ({ fetchPage, renderContainer }: Options) => {
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [lastFetchedPage, setLastFetchedPage] = useState(0);

    const onLoadMore = async () => {
        setFetchMoreLoading(true);
        await fetchPage(lastFetchedPage + 1);
        setLastFetchedPage(lastFetchedPage + 1);
        setFetchMoreLoading(false);
    };

    const button = (
        <Button onClick={onLoadMore} loading={fetchMoreLoading}>
            See more
        </Button>
    );

    const loadMoreButton = renderContainer ? (
        <LoadMoreContainer>{button}</LoadMoreContainer>
    ) : (
        button
    );

    return {
        loadMoreButton,
        fetchMoreLoading,
        setFetchMoreLoading,
        lastFetchedPage,
        setLastFetchedPage,
    };
};

const LoadMoreContainer = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.spacing(2)};
`;
