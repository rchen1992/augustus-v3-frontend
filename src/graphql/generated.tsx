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

export type Match = Node & {
    __typename?: 'Match';
    id: Scalars['ID'];
    tied: Scalars['Boolean'];
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['String']>;
    user1: User;
    user2: User;
    ladder: Ladder;
    winner: User;
    loser: User;
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
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['String']>;
    rating?: Maybe<Scalars['Int']>;
    ratingDelta?: Maybe<Scalars['Int']>;
};

export type UserMatchStats = {
    __typename?: 'UserMatchStats';
    matchCount?: Maybe<Scalars['Int']>;
    winCount?: Maybe<Scalars['Int']>;
    lossCount?: Maybe<Scalars['Int']>;
    tieCount?: Maybe<Scalars['Int']>;
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

export type GetUserLaddersQueryVariables = {};

export type GetUserLaddersQuery = { __typename?: 'Query' } & {
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
export const GetUserLaddersDocument = gql`
    query getUserLadders {
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
 * __useGetUserLaddersQuery__
 *
 * To run a query within a React component, call `useGetUserLaddersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLaddersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLaddersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserLaddersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetUserLaddersQuery,
        GetUserLaddersQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetUserLaddersQuery, GetUserLaddersQueryVariables>(
        GetUserLaddersDocument,
        baseOptions
    );
}
export function useGetUserLaddersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetUserLaddersQuery,
        GetUserLaddersQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetUserLaddersQuery, GetUserLaddersQueryVariables>(
        GetUserLaddersDocument,
        baseOptions
    );
}
export type GetUserLaddersQueryHookResult = ReturnType<typeof useGetUserLaddersQuery>;
export type GetUserLaddersLazyQueryHookResult = ReturnType<typeof useGetUserLaddersLazyQuery>;
export type GetUserLaddersQueryResult = ApolloReactCommon.QueryResult<
    GetUserLaddersQuery,
    GetUserLaddersQueryVariables
>;
