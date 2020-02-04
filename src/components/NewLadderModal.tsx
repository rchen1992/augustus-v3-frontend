import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { LADDER_NAME_MAX_LENGTH } from 'utils/constants';
import ErrorBox from 'components/ErrorBox';
import { useNewLadderMutation, GetUserLaddersQuery } from 'graphql/generated';
import GET_USER_LADDERS from 'graphql/queries/getUserLadders';

const NewLadderModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [ladderName, setLadderName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [newLadder, { loading, error }] = useNewLadderMutation({
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
        errorPolicy: 'all',
    });

    async function onSubmit() {
        setSubmitted(true);

        const trimmedLadderName = ladderName.trim();
        if (!trimmedLadderName) {
            return;
        }

        /**
         * HACK: prevents unhandled promise rejection from crashing the page
         * if this mutation fails.
         * https://github.com/apollographql/apollo-client/issues/3876
         */
        try {
            await newLadder({
                variables: { ladderName: trimmedLadderName },
            });
            reset();
        } catch {}
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
        setSubmitted(false);
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
                <Input
                    autoFocus
                    value={ladderName}
                    onChange={onChange}
                    placeholder="Enter ladder name"
                    maxLength={LADDER_NAME_MAX_LENGTH}
                />
                {submitted && error && <ErrorBox errors={error.graphQLErrors} />}
            </Modal>
        </>
    );
};

export default NewLadderModal;
