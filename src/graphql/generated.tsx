import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Ladder = Node & {
    __typename?: 'Ladder';
    id: Scalars['ID'];
    ladderName: Scalars['String'];
    inviteToken: Scalars['String'];
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['String']>;
    userRating?: Maybe<Scalars['Int']>;
    userRatingDelta?: Maybe<Scalars['Int']>;
    userRank?: Maybe<Scalars['Int']>;
    userMatchStats?: Maybe<UserMatchStats>;
    users: Array<User>;
    matches: Array<Match>;
};

export type LadderUsersArgs = {
    orderBy?: Maybe<LadderUsersOrderBy>;
};

export enum LadderUsersOrderBy {
    RankDesc = 'rank_DESC',
}

export type Match = Node & {
    __typename?: 'Match';
    id: Scalars['ID'];
    tied: Scalars['Boolean'];
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['String']>;
    user1: User;
    user2: User;
    ladder: Ladder;
    winner?: Maybe<User>;
    loser?: Maybe<User>;
};

export type Mutation = {
    __typename?: 'Mutation';
    newLadder: Ladder;
    newMatch: Match;
};

export type MutationNewLadderArgs = {
    ladderName: Scalars['String'];
};

export type MutationNewMatchArgs = {
    input: NewMatchInput;
};

export type NewMatchInput = {
    ladderId: Scalars['ID'];
    user1Id: Scalars['ID'];
    user2Id: Scalars['ID'];
    winnerId?: Maybe<Scalars['ID']>;
    loserId?: Maybe<Scalars['ID']>;
};

export type Node = {
    id: Scalars['ID'];
};

export type Query = {
    __typename?: 'Query';
    users: Array<User>;
    user?: Maybe<User>;
    me?: Maybe<User>;
    ladders: Array<Ladder>;
    ladder?: Maybe<Ladder>;
    matches: Array<Match>;
    match?: Maybe<Match>;
};

export type QueryUserArgs = {
    id: Scalars['ID'];
};

export type QueryLadderArgs = {
    id: Scalars['ID'];
};

export type QueryMatchesArgs = {
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
};

export type QueryMatchArgs = {
    id: Scalars['ID'];
};

export type User = Node & {
    __typename?: 'User';
    id: Scalars['ID'];
    email?: Maybe<Scalars['String']>;
    userName: Scalars['String'];
    avatarUrl?: Maybe<Scalars['String']>;
    ladders: Array<Ladder>;
    matches: Array<Match>;
    matchCount?: Maybe<Scalars['Int']>;
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['String']>;
    rating?: Maybe<Scalars['Int']>;
    ratingDelta?: Maybe<Scalars['Int']>;
    rank?: Maybe<Scalars['Int']>;
    ladderJoinDate?: Maybe<Scalars['String']>;
};

export type UserMatchesArgs = {
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
};

export type UserMatchStats = {
    __typename?: 'UserMatchStats';
    matchCount?: Maybe<Scalars['Int']>;
    winCount?: Maybe<Scalars['Int']>;
    lossCount?: Maybe<Scalars['Int']>;
    tieCount?: Maybe<Scalars['Int']>;
};

export type MatchFieldsFragment = { __typename?: 'Match' } & Pick<
    Match,
    'id' | 'tied' | 'createdAt'
> & {
        user1: { __typename?: 'User' } & Pick<User, 'id' | 'userName' | 'avatarUrl'>;
        user2: { __typename?: 'User' } & Pick<User, 'id' | 'userName' | 'avatarUrl'>;
        ladder: { __typename?: 'Ladder' } & Pick<Ladder, 'id' | 'ladderName'>;
        winner: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'userName'>>;
    };

export type NewLadderMutationVariables = {
    ladderName: Scalars['String'];
};

export type NewLadderMutation = { __typename?: 'Mutation' } & {
    newLadder: { __typename?: 'Ladder' } & Pick<
        Ladder,
        'id' | 'ladderName' | 'inviteToken' | 'userRating' | 'userRatingDelta' | 'userRank'
    > & {
            userMatchStats: Maybe<
                { __typename?: 'UserMatchStats' } & Pick<
                    UserMatchStats,
                    'matchCount' | 'winCount' | 'lossCount' | 'tieCount'
                >
            >;
        };
};

export type NewMatchMutationVariables = {
    input: NewMatchInput;
};

export type NewMatchMutation = { __typename?: 'Mutation' } & {
    newMatch: { __typename?: 'Match' } & MatchFieldsFragment;
};

export type GetLadderMatchesQueryVariables = {
    id: Scalars['ID'];
};

export type GetLadderMatchesQuery = { __typename?: 'Query' } & {
    ladder: Maybe<
        { __typename?: 'Ladder' } & Pick<Ladder, 'id'> & {
                matches: Array<{ __typename?: 'Match' } & MatchFieldsFragment>;
            }
    >;
};

export type GetLadderPageQueryVariables = {
    id: Scalars['ID'];
    ladderUsersOrderBy?: Maybe<LadderUsersOrderBy>;
};

export type GetLadderPageQuery = { __typename?: 'Query' } & {
    ladder: Maybe<
        { __typename?: 'Ladder' } & Pick<Ladder, 'id' | 'ladderName'> & {
                users: Array<
                    { __typename?: 'User' } & Pick<
                        User,
                        | 'id'
                        | 'userName'
                        | 'avatarUrl'
                        | 'rating'
                        | 'ratingDelta'
                        | 'rank'
                        | 'ladderJoinDate'
                    >
                >;
                matches: Array<
                    { __typename?: 'Match' } & Pick<Match, 'id' | 'createdAt'> & {
                            user1: { __typename?: 'User' } & Pick<
                                User,
                                'id' | 'userName' | 'avatarUrl'
                            >;
                            user2: { __typename?: 'User' } & Pick<
                                User,
                                'id' | 'userName' | 'avatarUrl'
                            >;
                            winner: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'userName'>>;
                        }
                >;
            }
    >;
};

export type GetLadderUsersQueryVariables = {
    id: Scalars['ID'];
};

export type GetLadderUsersQuery = { __typename?: 'Query' } & {
    ladder: Maybe<
        { __typename?: 'Ladder' } & Pick<Ladder, 'id'> & {
                users: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'userName'>>;
            }
    >;
};

export type GetMeQueryVariables = {};

export type GetMeQuery = { __typename?: 'Query' } & {
    me: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'userName'>>;
};

export type GetMyLaddersQueryVariables = {};

export type GetMyLaddersQuery = { __typename?: 'Query' } & {
    me: Maybe<
        { __typename?: 'User' } & Pick<User, 'id'> & {
                ladders: Array<
                    { __typename?: 'Ladder' } & Pick<
                        Ladder,
                        | 'id'
                        | 'ladderName'
                        | 'inviteToken'
                        | 'userRating'
                        | 'userRatingDelta'
                        | 'userRank'
                    > & {
                            userMatchStats: Maybe<
                                { __typename?: 'UserMatchStats' } & Pick<
                                    UserMatchStats,
                                    'matchCount' | 'winCount' | 'lossCount' | 'tieCount'
                                >
                            >;
                        }
                >;
            }
    >;
};

export type GetMyMatchesQueryVariables = {
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
};

export type GetMyMatchesQuery = { __typename?: 'Query' } & {
    me: Maybe<
        { __typename?: 'User' } & Pick<User, 'id' | 'matchCount'> & {
                matches: Array<{ __typename?: 'Match' } & MatchFieldsFragment>;
            }
    >;
};

export const MatchFieldsFragmentDoc = gql`
    fragment matchFields on Match {
        id
        tied
        createdAt
        user1 {
            id
            userName
            avatarUrl
        }
        user2 {
            id
            userName
            avatarUrl
        }
        ladder {
            id
            ladderName
        }
        winner {
            id
            userName
        }
    }
`;
export const NewLadderDocument = gql`
    mutation newLadder($ladderName: String!) {
        newLadder(ladderName: $ladderName) {
            id
            ladderName
            inviteToken
            userRating
            userRatingDelta
            userRank
            userMatchStats {
                matchCount
                winCount
                lossCount
                tieCount
            }
        }
    }
`;
export type NewLadderMutationFn = ApolloReactCommon.MutationFunction<
    NewLadderMutation,
    NewLadderMutationVariables
>;

/**
 * __useNewLadderMutation__
 *
 * To run a mutation, you first call `useNewLadderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewLadderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newLadderMutation, { data, loading, error }] = useNewLadderMutation({
 *   variables: {
 *      ladderName: // value for 'ladderName'
 *   },
 * });
 */
export function useNewLadderMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        NewLadderMutation,
        NewLadderMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<NewLadderMutation, NewLadderMutationVariables>(
        NewLadderDocument,
        baseOptions
    );
}
export type NewLadderMutationHookResult = ReturnType<typeof useNewLadderMutation>;
export type NewLadderMutationResult = ApolloReactCommon.MutationResult<NewLadderMutation>;
export type NewLadderMutationOptions = ApolloReactCommon.BaseMutationOptions<
    NewLadderMutation,
    NewLadderMutationVariables
>;
export const NewMatchDocument = gql`
    mutation newMatch($input: NewMatchInput!) {
        newMatch(input: $input) {
            ...matchFields
        }
    }
    ${MatchFieldsFragmentDoc}
`;
export type NewMatchMutationFn = ApolloReactCommon.MutationFunction<
    NewMatchMutation,
    NewMatchMutationVariables
>;

/**
 * __useNewMatchMutation__
 *
 * To run a mutation, you first call `useNewMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newMatchMutation, { data, loading, error }] = useNewMatchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewMatchMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<NewMatchMutation, NewMatchMutationVariables>
) {
    return ApolloReactHooks.useMutation<NewMatchMutation, NewMatchMutationVariables>(
        NewMatchDocument,
        baseOptions
    );
}
export type NewMatchMutationHookResult = ReturnType<typeof useNewMatchMutation>;
export type NewMatchMutationResult = ApolloReactCommon.MutationResult<NewMatchMutation>;
export type NewMatchMutationOptions = ApolloReactCommon.BaseMutationOptions<
    NewMatchMutation,
    NewMatchMutationVariables
>;
export const GetLadderMatchesDocument = gql`
    query getLadderMatches($id: ID!) {
        ladder(id: $id) {
            id
            matches {
                ...matchFields
            }
        }
    }
    ${MatchFieldsFragmentDoc}
`;

/**
 * __useGetLadderMatchesQuery__
 *
 * To run a query within a React component, call `useGetLadderMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLadderMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLadderMatchesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLadderMatchesQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetLadderMatchesQuery,
        GetLadderMatchesQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetLadderMatchesQuery, GetLadderMatchesQueryVariables>(
        GetLadderMatchesDocument,
        baseOptions
    );
}
export function useGetLadderMatchesLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetLadderMatchesQuery,
        GetLadderMatchesQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetLadderMatchesQuery, GetLadderMatchesQueryVariables>(
        GetLadderMatchesDocument,
        baseOptions
    );
}
export type GetLadderMatchesQueryHookResult = ReturnType<typeof useGetLadderMatchesQuery>;
export type GetLadderMatchesLazyQueryHookResult = ReturnType<typeof useGetLadderMatchesLazyQuery>;
export type GetLadderMatchesQueryResult = ApolloReactCommon.QueryResult<
    GetLadderMatchesQuery,
    GetLadderMatchesQueryVariables
>;
export const GetLadderPageDocument = gql`
    query getLadderPage($id: ID!, $ladderUsersOrderBy: LadderUsersOrderBy) {
        ladder(id: $id) {
            id
            ladderName
            users(orderBy: $ladderUsersOrderBy) {
                id
                userName
                avatarUrl
                rating
                ratingDelta
                rank
                ladderJoinDate
            }
            matches {
                id
                createdAt
                user1 {
                    id
                    userName
                    avatarUrl
                }
                user2 {
                    id
                    userName
                    avatarUrl
                }
                winner {
                    id
                    userName
                }
            }
        }
    }
`;

/**
 * __useGetLadderPageQuery__
 *
 * To run a query within a React component, call `useGetLadderPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLadderPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLadderPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      ladderUsersOrderBy: // value for 'ladderUsersOrderBy'
 *   },
 * });
 */
export function useGetLadderPageQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetLadderPageQuery, GetLadderPageQueryVariables>
) {
    return ApolloReactHooks.useQuery<GetLadderPageQuery, GetLadderPageQueryVariables>(
        GetLadderPageDocument,
        baseOptions
    );
}
export function useGetLadderPageLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetLadderPageQuery,
        GetLadderPageQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetLadderPageQuery, GetLadderPageQueryVariables>(
        GetLadderPageDocument,
        baseOptions
    );
}
export type GetLadderPageQueryHookResult = ReturnType<typeof useGetLadderPageQuery>;
export type GetLadderPageLazyQueryHookResult = ReturnType<typeof useGetLadderPageLazyQuery>;
export type GetLadderPageQueryResult = ApolloReactCommon.QueryResult<
    GetLadderPageQuery,
    GetLadderPageQueryVariables
>;
export const GetLadderUsersDocument = gql`
    query getLadderUsers($id: ID!) {
        ladder(id: $id) {
            id
            users {
                id
                userName
            }
        }
    }
`;

/**
 * __useGetLadderUsersQuery__
 *
 * To run a query within a React component, call `useGetLadderUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLadderUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLadderUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLadderUsersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetLadderUsersQuery,
        GetLadderUsersQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetLadderUsersQuery, GetLadderUsersQueryVariables>(
        GetLadderUsersDocument,
        baseOptions
    );
}
export function useGetLadderUsersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetLadderUsersQuery,
        GetLadderUsersQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetLadderUsersQuery, GetLadderUsersQueryVariables>(
        GetLadderUsersDocument,
        baseOptions
    );
}
export type GetLadderUsersQueryHookResult = ReturnType<typeof useGetLadderUsersQuery>;
export type GetLadderUsersLazyQueryHookResult = ReturnType<typeof useGetLadderUsersLazyQuery>;
export type GetLadderUsersQueryResult = ApolloReactCommon.QueryResult<
    GetLadderUsersQuery,
    GetLadderUsersQueryVariables
>;
export const GetMeDocument = gql`
    query getMe {
        me {
            id
            userName
        }
    }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
    return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
}
export function useGetMeLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
    return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        baseOptions
    );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMyLaddersDocument = gql`
    query getMyLadders {
        me {
            id
            ladders {
                id
                ladderName
                inviteToken
                userRating
                userRatingDelta
                userRank
                userMatchStats {
                    matchCount
                    winCount
                    lossCount
                    tieCount
                }
            }
        }
    }
`;

/**
 * __useGetMyLaddersQuery__
 *
 * To run a query within a React component, call `useGetMyLaddersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyLaddersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyLaddersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyLaddersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyLaddersQuery, GetMyLaddersQueryVariables>
) {
    return ApolloReactHooks.useQuery<GetMyLaddersQuery, GetMyLaddersQueryVariables>(
        GetMyLaddersDocument,
        baseOptions
    );
}
export function useGetMyLaddersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetMyLaddersQuery,
        GetMyLaddersQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetMyLaddersQuery, GetMyLaddersQueryVariables>(
        GetMyLaddersDocument,
        baseOptions
    );
}
export type GetMyLaddersQueryHookResult = ReturnType<typeof useGetMyLaddersQuery>;
export type GetMyLaddersLazyQueryHookResult = ReturnType<typeof useGetMyLaddersLazyQuery>;
export type GetMyLaddersQueryResult = ApolloReactCommon.QueryResult<
    GetMyLaddersQuery,
    GetMyLaddersQueryVariables
>;
export const GetMyMatchesDocument = gql`
    query getMyMatches($offset: Int, $limit: Int) {
        me {
            id
            matches(offset: $offset, limit: $limit) @connection(key: "matches") {
                ...matchFields
            }
            matchCount
        }
    }
    ${MatchFieldsFragmentDoc}
`;

/**
 * __useGetMyMatchesQuery__
 *
 * To run a query within a React component, call `useGetMyMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMatchesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMyMatchesQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyMatchesQuery, GetMyMatchesQueryVariables>
) {
    return ApolloReactHooks.useQuery<GetMyMatchesQuery, GetMyMatchesQueryVariables>(
        GetMyMatchesDocument,
        baseOptions
    );
}
export function useGetMyMatchesLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetMyMatchesQuery,
        GetMyMatchesQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetMyMatchesQuery, GetMyMatchesQueryVariables>(
        GetMyMatchesDocument,
        baseOptions
    );
}
export type GetMyMatchesQueryHookResult = ReturnType<typeof useGetMyMatchesQuery>;
export type GetMyMatchesLazyQueryHookResult = ReturnType<typeof useGetMyMatchesLazyQuery>;
export type GetMyMatchesQueryResult = ApolloReactCommon.QueryResult<
    GetMyMatchesQuery,
    GetMyMatchesQueryVariables
>;
