import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { LADDER_NAME_MAX_LENGTH } from 'utils/constants';
import { useNewLadderMutation, GetMyLaddersQuery } from 'graphql/generated';
import GET_MY_LADDERS from 'graphql/queries/getMyLadders';
import styled from 'styled-components';
import useGraphQLErrorBox from 'hooks/useGraphQLErrorBox';

const NewLadderModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [ladderName, setLadderName] = useState('');
    const [clientValidationError, setClientValidationError] = useState(false);
    const { setGraphQLErrors, graphQLErrorBox } = useGraphQLErrorBox();

    const [newLadder, { loading }] = useNewLadderMutation({
        update(cache, { data }) {
            const { me } = cache.readQuery({
                query: GET_MY_LADDERS,
            }) as GetMyLaddersQuery;

            if (me?.ladders && data?.newLadder) {
                cache.writeQuery({
                    query: GET_MY_LADDERS,
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

                {graphQLErrorBox}
            </Modal>
        </>
    );
};

export default NewLadderModal;

const StyledFormItem = styled(Form.Item)`
    margin-bottom: 0;
`;
