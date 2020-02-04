import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { LADDER_NAME_MAX_LENGTH } from 'utils/constants';
import ErrorBox from 'components/ErrorBox';
import { useNewLadderMutation, GetUserLaddersQuery } from 'graphql/generated';
import GET_USER_LADDERS from 'graphql/queries/getUserLadders';
import { GraphQLError } from 'graphql';
import styled from 'styled-components';

const NewLadderModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [ladderName, setLadderName] = useState('');
    const [clientValidationError, setClientValidationError] = useState(false);
    const [graphQLErrors, setGraphQLErrors] = useState([] as Readonly<GraphQLError[]>);

    const [newLadder, { loading }] = useNewLadderMutation({
        update(cache, { data }) {
            const { me } = cache.readQuery({
                query: GET_USER_LADDERS,
            }) as GetUserLaddersQuery;

            if (me?.ladders && data?.newLadder) {
                cache.writeQuery({
                    query: GET_USER_LADDERS,
                    data: {
                        me: {
                            ...me,
                            ladders: me.ladders.concat([data.newLadder]),
                        },
                    },
                });
            }
        },
    });

    async function onSubmit() {
        setClientValidationError(false);

        const trimmedLadderName = ladderName.trim();
        if (!trimmedLadderName) {
            setClientValidationError(true);
            return;
        }

        /**
         * Note: without a try/catch, an unhandled promise rejection
         * from our mutation will crash the page.
         * https://github.com/apollographql/apollo-client/issues/3876
         */
        try {
            await newLadder({
                variables: { ladderName: trimmedLadderName },
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

    function onClose() {
        reset();
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setLadderName(value);
    }

    function reset() {
        setLadderName('');
        setVisible(false);
        setClientValidationError(false);
        setGraphQLErrors([]);
    }

    return (
        <>
            <Button type="default" onClick={() => setVisible(true)}>
                New Ladder
            </Button>
            <Modal
                title="Create new ladder"
                visible={visible}
                onOk={onSubmit}
                onCancel={onClose}
                confirmLoading={loading}
            >
                <StyledFormItem
                    validateStatus={clientValidationError ? 'error' : undefined}
                    help={clientValidationError && 'Should be combination of numbers & alphabets'}
                >
                    <Input
                        autoFocus
                        value={ladderName}
                        onChange={onChange}
                        placeholder="Enter ladder name"
                        maxLength={LADDER_NAME_MAX_LENGTH}
                    />
                </StyledFormItem>
                {graphQLErrors.length > 0 && <ErrorBox errors={graphQLErrors} />}
            </Modal>
        </>
    );
};

export default NewLadderModal;

const StyledFormItem = styled(Form.Item)`
    margin-bottom: 0;
`;
