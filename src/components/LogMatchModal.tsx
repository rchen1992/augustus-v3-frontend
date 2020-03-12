import React, { useState } from 'react';
import { Button, Modal, Form, Select, Spin, Radio } from 'antd';
import {
    useNewMatchMutation,
    useGetMeQuery,
    useGetMyLaddersQuery,
    useGetLadderUsersLazyQuery,
    GetMyMatchesQuery,
    GetLadderMatchesQuery,
    GetLadderRankingsDocument,
    NewMatchMutation,
    LadderUsersOrderBy,
} from 'graphql/generated';
import GET_USER_MATCHES from 'graphql/queries/getMyMatches';
import GET_LADDER_MATCHES from 'graphql/queries/getLadderMatches';
import styled from 'styled-components';
import filterOptionsByName from 'utils/selectFilterOptionsByName';
import { RadioChangeEvent } from 'antd/lib/radio';
import { DataProxy } from 'apollo-cache';
import useGraphQLErrorBox from 'hooks/useGraphQLErrorBox';
import { FetchResult } from 'apollo-boost';

const { Option } = Select;

enum MatchResult {
    PlayerWin,
    OpponentWin,
    Tie,
}

function getMatchResult(playerId: string, opponentId: string, result: MatchResult) {
    if (result === MatchResult.PlayerWin) {
        return {
            winnerId: playerId,
            loserId: opponentId,
        };
    }

    if (result === MatchResult.OpponentWin) {
        return {
            winnerId: opponentId,
            loserId: playerId,
        };
    }

    return {
        winnerId: null,
        loserId: null,
    };
}

/**
 * Update user matches cache after new match mutation.
 */
function updateMyMatches(cache: DataProxy, newMatchData?: NewMatchMutation | null) {
    try {
        const cachedData = cache.readQuery({
            query: GET_USER_MATCHES,
        }) as GetMyMatchesQuery;

        if (cachedData?.me?.matches && newMatchData?.newMatch) {
            const me = cachedData.me;

            cache.writeQuery({
                query: GET_USER_MATCHES,
                data: {
                    me: {
                        ...me,
                        matches: [newMatchData.newMatch].concat(me.matches),
                    },
                },
            });
        }
    } catch {}
}

/**
 * Update ladder matches cache after new match mutation.
 */
function updateLadderMatches(cache: DataProxy, newMatchData?: NewMatchMutation | null) {
    try {
        const cachedData = cache.readQuery({
            query: GET_LADDER_MATCHES,
            variables: {
                id: newMatchData!.newMatch.ladder.id,
            },
        }) as GetLadderMatchesQuery;

        if (cachedData?.ladder?.matches && newMatchData?.newMatch) {
            const ladder = cachedData.ladder;

            cache.writeQuery({
                query: GET_LADDER_MATCHES,
                variables: {
                    id: newMatchData!.newMatch.ladder.id,
                },
                data: {
                    ladder: {
                        ...ladder,
                        matches: [newMatchData.newMatch].concat(ladder.matches),
                    },
                },
            });
        }
    } catch {}
}

const LogMatchModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [ladderId, setLadderId] = useState();
    const [opponentId, setOpponentId] = useState();
    const [result, setResult] = useState(MatchResult.PlayerWin);
    const [submitted, setSubmitted] = useState(false);
    const { setGraphQLErrors, graphQLErrorBox } = useGraphQLErrorBox();

    const { data: meData } = useGetMeQuery();
    const [
        getLadderUsers,
        { loading: ladderUsersLoading, data: ladderUserData },
    ] = useGetLadderUsersLazyQuery();
    const {
        loading: myLaddersLoading,
        data: myLaddersData,
        refetch: myLaddersRefetch,
    } = useGetMyLaddersQuery();

    const authedUserId = meData?.me?.id;
    const userLadders = myLaddersData?.me?.userLadders;
    const opponents = ladderUserData?.ladder?.ladderUsers.filter(
        ladderUser => ladderUser.user.id !== authedUserId
    );

    const [newMatch, { loading: newMatchLoading }] = useNewMatchMutation({
        refetchQueries: ({ data }: FetchResult<NewMatchMutation>) => {
            /**
             * Refetch rankings on the specific ladder page.
             */
            return [
                {
                    query: GetLadderRankingsDocument,
                    variables: {
                        id: data!.newMatch.ladder.id,
                        ladderUsersOrderBy: LadderUsersOrderBy.RankDesc,
                    },
                },
            ];
        },
        update(cache, { data }) {
            updateMyMatches(cache, data);
            updateLadderMatches(cache, data);
            myLaddersRefetch();
        },
    });

    async function onSubmit() {
        setSubmitted(true);

        if (!ladderId || !opponentId) {
            return;
        }

        /**
         * Note: without a try/catch, an unhandled promise rejection
         * from our mutation will crash the page.
         * https://github.com/apollographql/apollo-client/issues/3876
         */
        try {
            const matchResult = getMatchResult(authedUserId!, opponentId, result);

            await newMatch({
                variables: {
                    input: {
                        ladderId,
                        user1Id: authedUserId!,
                        user2Id: opponentId,
                        ...matchResult,
                    },
                },
            });
            reset();
        } catch (err) {
            /**
             * Keep track of graphQL errors in our own state so
             * that we can reset them upon closing the modal.
             */
            setGraphQLErrors(err.graphQLErrors);
        }
    }

    function onOpen() {
        setVisible(true);
    }

    function onClose() {
        reset();
    }

    function onLadderChange(value: unknown) {
        setLadderId(value);
        getLadderUsers({
            variables: {
                id: value as string,
            },
        });

        /**
         * Reset opponent when ladder changes in case
         * current opponent doesn't exist in current ladder.
         */
        setOpponentId(undefined);
    }

    function onOpponentChange(value: unknown) {
        setOpponentId(value);
    }

    function onResultChange(e: RadioChangeEvent) {
        setResult(e.target.value);
    }

    function reset() {
        setLadderId(undefined);
        setOpponentId(undefined);
        setResult(MatchResult.PlayerWin);
        setVisible(false);
        setSubmitted(false);
        setGraphQLErrors([]);
    }

    const ladderOptions = userLadders?.map(({ ladder: { id, ladderName } }) => (
        <Option key={id} value={id}>
            {ladderName}
        </Option>
    ));

    const opponentOptions = opponents?.map(({ user: { id, userName } }) => (
        <Option key={id} value={id}>
            {userName}
        </Option>
    ));

    const modalContents =
        myLaddersLoading || !userLadders ? (
            <SpinContainer>
                <Spin />
            </SpinContainer>
        ) : (
            <>
                <StyledFormItem
                    label="Ladder name"
                    validateStatus={submitted && !ladderId ? 'error' : undefined}
                >
                    <StyledSelect
                        showSearch
                        placeholder="Select a ladder"
                        optionFilterProp="children"
                        value={ladderId}
                        onChange={onLadderChange}
                        filterOption={filterOptionsByName}
                    >
                        {ladderOptions}
                    </StyledSelect>
                </StyledFormItem>

                <StyledFormItem
                    label="Opponent name"
                    validateStatus={submitted && !opponentId ? 'error' : undefined}
                >
                    <StyledSelect
                        showSearch
                        placeholder="Select an opponent"
                        optionFilterProp="children"
                        value={opponentId}
                        onChange={onOpponentChange}
                        filterOption={filterOptionsByName}
                        loading={ladderUsersLoading}
                        disabled={!ladderId || !opponentOptions}
                    >
                        {opponentOptions}
                    </StyledSelect>
                </StyledFormItem>

                <StyledFormItem label="Match result">
                    <Radio.Group onChange={onResultChange} value={result}>
                        <Radio.Button value={MatchResult.PlayerWin}>I won</Radio.Button>
                        <Radio.Button value={MatchResult.OpponentWin}>Opponent won</Radio.Button>
                        <Radio.Button value={MatchResult.Tie}>Tie</Radio.Button>
                    </Radio.Group>
                </StyledFormItem>

                {graphQLErrorBox}
            </>
        );

    return (
        <>
            <StyledButton ghost onClick={onOpen}>
                Log Match
            </StyledButton>
            <Modal
                title="Log a match"
                visible={visible}
                onOk={onSubmit}
                onCancel={onClose}
                confirmLoading={newMatchLoading}
            >
                {modalContents}
            </Modal>
        </>
    );
};

export default LogMatchModal;

const SpinContainer = styled.div`
    text-align: center;
`;

const StyledFormItem = styled(Form.Item)`
    margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledButton = styled(Button)`
    :hover,
    :active,
    :focus {
        color: ${({ theme }) => theme.colors.gray(3)};
        border-color: ${({ theme }) => theme.colors.gray(3)};
    }
`;

const StyledSelect = styled(Select)`
    width: 100%;
`;
