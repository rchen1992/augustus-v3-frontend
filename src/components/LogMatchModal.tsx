import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Select, Spin, Radio } from 'antd';
import ErrorBox from 'components/ErrorBox';
import {
    useNewLadderMutation,
    GetUserLaddersQuery,
    useGetMeQuery,
    useGetUserLaddersQuery,
    useGetLadderUsersLazyQuery,
} from 'graphql/generated';
import GET_USER_LADDERS from 'graphql/queries/getUserLadders';
import { GraphQLError } from 'graphql';
import styled from 'styled-components';
import filterOptionsByName from 'utils/selectFilterOptionsByName';
import { RadioChangeEvent } from 'antd/lib/radio';

const { Option } = Select;

const PLAYER_RADIO = 'player';
const OPPONENT_RADIO = 'opponent';
const TIE_RADIO = 'tie';

const LogMatchModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [ladderId, setLadderId] = useState();
    const [opponentId, setOpponentId] = useState();
    const [result, setResult] = useState(PLAYER_RADIO);
    const [clientValidationError, setClientValidationError] = useState(false);
    const [graphQLErrors, setGraphQLErrors] = useState([] as Readonly<GraphQLError[]>);

    const { data: meData } = useGetMeQuery();
    const [
        getLadderUsers,
        { loading: ladderUsersLoading, data: ladderUserData },
    ] = useGetLadderUsersLazyQuery();
    const { loading: userLaddersLoading, data: userLaddersData } = useGetUserLaddersQuery();

    const authedUserId = meData?.me?.id;
    const ladders = userLaddersData?.me?.ladders;
    const opponents = ladderUserData?.ladder?.users.filter(
        ladderUser => ladderUser.id !== authedUserId
    );

    // const [newLadder, { loading }] = useNewLadderMutation({
    //     update(cache, { data }) {
    //         const { me } = cache.readQuery({
    //             query: GET_USER_LADDERS,
    //         }) as GetUserLaddersQuery;

    //         if (me?.ladders && data?.newLadder) {
    //             cache.writeQuery({
    //                 query: GET_USER_LADDERS,
    //                 data: {
    //                     me: {
    //                         ...me,
    //                         ladders: me.ladders.concat([data.newLadder]),
    //                     },
    //                 },
    //             });
    //         }
    //     },
    // });

    async function onSubmit() {
        console.log(ladderId, opponentId, result);
        setClientValidationError(false);

        // const trimmedLadderName = ladderName.trim();
        // if (!trimmedLadderName) {
        //     setClientValidationError(true);
        //     return;
        // }

        /**
         * Note: without a try/catch, an unhandled promise rejection
         * from our mutation will crash the page.
         * https://github.com/apollographql/apollo-client/issues/3876
         */
        try {
            // await newLadder({
            //     variables: { ladderName: trimmedLadderName },
            // });
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
        setResult(PLAYER_RADIO);
        setVisible(false);
        setClientValidationError(false);
        setGraphQLErrors([]);
    }

    const ladderOptions = ladders?.map(({ id, ladderName }) => (
        <Option key={id} value={id}>
            {ladderName}
        </Option>
    ));

    const opponentOptions = opponents?.map(({ id, userName }) => (
        <Option key={id} value={id}>
            {userName}
        </Option>
    ));

    const modalContents =
        userLaddersLoading || !ladders ? (
            <SpinContainer>
                <Spin />
            </SpinContainer>
        ) : (
            <>
                <StyledFormItem label="Ladder name" hasFeedback>
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

                <StyledFormItem label="Opponent name" hasFeedback>
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
                        <Radio.Button value={PLAYER_RADIO}>I won</Radio.Button>
                        <Radio.Button value={OPPONENT_RADIO}>Opponent won</Radio.Button>
                        <Radio.Button value={TIE_RADIO}>Tie</Radio.Button>
                    </Radio.Group>
                </StyledFormItem>

                {graphQLErrors.length > 0 && <ErrorBox errors={graphQLErrors} />}
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
                // confirmLoading={loading}
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
