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
    myLadderUser?: Maybe<LadderUser>;
    ladderUser?: Maybe<LadderUser>;
    ladderUsers: Array<LadderUser>;
    matches: Array<Match>;
    matchCount?: Maybe<Scalars['Int']>;
};

export type LadderLadderUserArgs = {
    userId: Scalars['ID'];
};

export type LadderLadderUsersArgs = {
    orderBy?: Maybe<LadderUsersOrderBy>;
};

export type LadderMatchesArgs = {
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
};

export type LadderUser = {
    __typename?: 'LadderUser';
    id: Scalars['ID'];
    rating?: Maybe<Scalars['Int']>;
    ratingDelta?: Maybe<Scalars['Int']>;
    rank?: Maybe<Scalars['Int']>;
    matchStats?: Maybe<UserMatchStats>;
    user: User;
    ladder: Ladder;
    joinDate?: Maybe<Scalars['String']>;
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
    newLadder: LadderUser;
    joinLadder: LadderUser;
    newMatch: Match;
};

export type MutationNewLadderArgs = {
    ladderName: Scalars['String'];
};

export type MutationJoinLadderArgs = {
    token: Scalars['String'];
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
    ladderByInviteToken?: Maybe<Ladder>;
    matches: Array<Match>;
    match?: Maybe<Match>;
};

export type QueryUserArgs = {
    id: Scalars['ID'];
};

export type QueryLadderArgs = {
    id: Scalars['ID'];
};

export type QueryLadderByInviteTokenArgs = {
    token: Scalars['String'];
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
    userLadders: Array<LadderUser>;
    matches: Array<Match>;
    matchCount?: Maybe<Scalars['Int']>;
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['String']>;
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

export type UserLadderFieldsFragment = { __typename?: 'LadderUser' } & Pick<
    LadderUser,
    'id' | 'rating' | 'ratingDelta' | 'rank'
> & {
        matchStats: Maybe<
            { __typename?: 'UserMatchStats' } & Pick<
                UserMatchStats,
                'matchCount' | 'winCount' | 'lossCount' | 'tieCount'
            >
        >;
        ladder: { __typename?: 'Ladder' } & Pick<Ladder, 'id' | 'ladderName' | 'inviteToken'>;
    };

export type JoinLadderMutationVariables = {
    token: Scalars['String'];
};

export type JoinLadderMutation = { __typename?: 'Mutation' } & {
    joinLadder: { __typename?: 'LadderUser' } & UserLadderFieldsFragment;
};

export type NewLadderMutationVariables = {
    ladderName: Scalars['String'];
};

export type NewLadderMutation = { __typename?: 'Mutation' } & {
    newLadder: { __typename?: 'LadderUser' } & UserLadderFieldsFragment;
};

export type NewMatchMutationVariables = {
    input: NewMatchInput;
};

export type NewMatchMutation = { __typename?: 'Mutation' } & {
    newMatch: { __typename?: 'Match' } & MatchFieldsFragment;
};

export type GetLadderByInviteTokenQueryVariables = {
    token: Scalars['String'];
};

export type GetLadderByInviteTokenQuery = { __typename?: 'Query' } & {
    ladderByInviteToken: Maybe<{ __typename?: 'Ladder' } & Pick<Ladder, 'id' | 'ladderName'>>;
};

export type GetLadderMatchesQueryVariables = {
    id: Scalars['ID'];
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
};

export type GetLadderMatchesQuery = { __typename?: 'Query' } & {
    ladder: Maybe<
        { __typename?: 'Ladder' } & Pick<Ladder, 'id' | 'matchCount'> & {
                matches: Array<{ __typename?: 'Match' } & MatchFieldsFragment>;
            }
    >;
};

export type GetLadderNameQueryVariables = {
    id: Scalars['ID'];
};

export type GetLadderNameQuery = { __typename?: 'Query' } & {
    ladder: Maybe<{ __typename?: 'Ladder' } & Pick<Ladder, 'id' | 'ladderName'>>;
};

export type GetLadderRankingsQueryVariables = {
    id: Scalars['ID'];
    ladderUsersOrderBy?: Maybe<LadderUsersOrderBy>;
};

export type GetLadderRankingsQuery = { __typename?: 'Query' } & {
    ladder: Maybe<
        { __typename?: 'Ladder' } & Pick<Ladder, 'id'> & {
                ladderUsers: Array<
                    { __typename?: 'LadderUser' } & Pick<
                        LadderUser,
                        'id' | 'rating' | 'ratingDelta' | 'rank' | 'joinDate'
                    > & {
                            user: { __typename?: 'User' } & Pick<
                                User,
                                'id' | 'userName' | 'avatarUrl'
                            >;
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
                ladderUsers: Array<
                    { __typename?: 'LadderUser' } & Pick<LadderUser, 'id'> & {
                            user: { __typename?: 'User' } & Pick<User, 'id' | 'userName'>;
                        }
                >;
            }
    >;
};

export type GetMeQueryVariables = {};

export type GetMeQuery = { __typename?: 'Query' } & {
    me: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'userName' | 'avatarUrl'>>;
};

export type GetMyLaddersQueryVariables = {};

export type GetMyLaddersQuery = { __typename?: 'Query' } & {
    me: Maybe<
        { __typename?: 'User' } & Pick<User, 'id'> & {
                userLadders: Array<{ __typename?: 'LadderUser' } & UserLadderFieldsFragment>;
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
export const UserLadderFieldsFragmentDoc = gql`
    fragment userLadderFields on LadderUser {
        id
        rating
        ratingDelta
        rank
        matchStats {
            matchCount
            winCount
            lossCount
            tieCount
        }
        ladder {
            id
            ladderName
            inviteToken
        }
    }
`;
export const JoinLadderDocument = gql`
    mutation joinLadder($token: String!) {
        joinLadder(token: $token) {
            ...userLadderFields
        }
    }
    ${UserLadderFieldsFragmentDoc}
`;
export type JoinLadderMutationFn = ApolloReactCommon.MutationFunction<
    JoinLadderMutation,
    JoinLadderMutationVariables
>;

/**
 * __useJoinLadderMutation__
 *
 * To run a mutation, you first call `useJoinLadderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinLadderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinLadderMutation, { data, loading, error }] = useJoinLadderMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useJoinLadderMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        JoinLadderMutation,
        JoinLadderMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<JoinLadderMutation, JoinLadderMutationVariables>(
        JoinLadderDocument,
        baseOptions
    );
}
export type JoinLadderMutationHookResult = ReturnType<typeof useJoinLadderMutation>;
export type JoinLadderMutationResult = ApolloReactCommon.MutationResult<JoinLadderMutation>;
export type JoinLadderMutationOptions = ApolloReactCommon.BaseMutationOptions<
    JoinLadderMutation,
    JoinLadderMutationVariables
>;
export const NewLadderDocument = gql`
    mutation newLadder($ladderName: String!) {
        newLadder(ladderName: $ladderName) {
            ...userLadderFields
        }
    }
    ${UserLadderFieldsFragmentDoc}
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
export const GetLadderByInviteTokenDocument = gql`
    query getLadderByInviteToken($token: String!) {
        ladderByInviteToken(token: $token) {
            id
            ladderName
        }
    }
`;

/**
 * __useGetLadderByInviteTokenQuery__
 *
 * To run a query within a React component, call `useGetLadderByInviteTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLadderByInviteTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLadderByInviteTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetLadderByInviteTokenQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetLadderByInviteTokenQuery,
        GetLadderByInviteTokenQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<
        GetLadderByInviteTokenQuery,
        GetLadderByInviteTokenQueryVariables
    >(GetLadderByInviteTokenDocument, baseOptions);
}
export function useGetLadderByInviteTokenLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetLadderByInviteTokenQuery,
        GetLadderByInviteTokenQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<
        GetLadderByInviteTokenQuery,
        GetLadderByInviteTokenQueryVariables
    >(GetLadderByInviteTokenDocument, baseOptions);
}
export type GetLadderByInviteTokenQueryHookResult = ReturnType<
    typeof useGetLadderByInviteTokenQuery
>;
export type GetLadderByInviteTokenLazyQueryHookResult = ReturnType<
    typeof useGetLadderByInviteTokenLazyQuery
>;
export type GetLadderByInviteTokenQueryResult = ApolloReactCommon.QueryResult<
    GetLadderByInviteTokenQuery,
    GetLadderByInviteTokenQueryVariables
>;
export const GetLadderMatchesDocument = gql`
    query getLadderMatches($id: ID!, $offset: Int, $limit: Int) {
        ladder(id: $id) {
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
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
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
export const GetLadderNameDocument = gql`
    query getLadderName($id: ID!) {
        ladder(id: $id) {
            id
            ladderName
        }
    }
`;

/**
 * __useGetLadderNameQuery__
 *
 * To run a query within a React component, call `useGetLadderNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLadderNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLadderNameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLadderNameQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetLadderNameQuery, GetLadderNameQueryVariables>
) {
    return ApolloReactHooks.useQuery<GetLadderNameQuery, GetLadderNameQueryVariables>(
        GetLadderNameDocument,
        baseOptions
    );
}
export function useGetLadderNameLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetLadderNameQuery,
        GetLadderNameQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetLadderNameQuery, GetLadderNameQueryVariables>(
        GetLadderNameDocument,
        baseOptions
    );
}
export type GetLadderNameQueryHookResult = ReturnType<typeof useGetLadderNameQuery>;
export type GetLadderNameLazyQueryHookResult = ReturnType<typeof useGetLadderNameLazyQuery>;
export type GetLadderNameQueryResult = ApolloReactCommon.QueryResult<
    GetLadderNameQuery,
    GetLadderNameQueryVariables
>;
export const GetLadderRankingsDocument = gql`
    query getLadderRankings($id: ID!, $ladderUsersOrderBy: LadderUsersOrderBy) {
        ladder(id: $id) {
            id
            ladderUsers(orderBy: $ladderUsersOrderBy) {
                id
                rating
                ratingDelta
                rank
                joinDate
                user {
                    id
                    userName
                    avatarUrl
                }
            }
        }
    }
`;

/**
 * __useGetLadderRankingsQuery__
 *
 * To run a query within a React component, call `useGetLadderRankingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLadderRankingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLadderRankingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      ladderUsersOrderBy: // value for 'ladderUsersOrderBy'
 *   },
 * });
 */
export function useGetLadderRankingsQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetLadderRankingsQuery,
        GetLadderRankingsQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetLadderRankingsQuery, GetLadderRankingsQueryVariables>(
        GetLadderRankingsDocument,
        baseOptions
    );
}
export function useGetLadderRankingsLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetLadderRankingsQuery,
        GetLadderRankingsQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetLadderRankingsQuery, GetLadderRankingsQueryVariables>(
        GetLadderRankingsDocument,
        baseOptions
    );
}
export type GetLadderRankingsQueryHookResult = ReturnType<typeof useGetLadderRankingsQuery>;
export type GetLadderRankingsLazyQueryHookResult = ReturnType<typeof useGetLadderRankingsLazyQuery>;
export type GetLadderRankingsQueryResult = ApolloReactCommon.QueryResult<
    GetLadderRankingsQuery,
    GetLadderRankingsQueryVariables
>;
export const GetLadderUsersDocument = gql`
    query getLadderUsers($id: ID!) {
        ladder(id: $id) {
            id
            ladderUsers {
                id
                user {
                    id
                    userName
                }
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
            avatarUrl
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
            userLadders {
                ...userLadderFields
            }
        }
    }
    ${UserLadderFieldsFragmentDoc}
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
