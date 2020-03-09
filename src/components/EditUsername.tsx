import React, { useState, useRef } from 'react';
import { Input, Form, Button } from 'antd';
import { USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH } from 'utils/constants';
import { useUpdateUserMutation, GetMeQuery } from 'graphql/generated';
import GET_ME from 'graphql/queries/getMe';
import styled from 'styled-components';
import useGraphQLErrorBox from 'hooks/useGraphQLErrorBox';

interface EditUsernameProps {
    userName: string;
}

const { Group: ButtonGroup } = Button;

const EditUsername: React.FC<EditUsernameProps> = ({ userName }) => {
    const [editing, setEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(userName);
    const [clientValidationError, setClientValidationError] = useState('');
    const { setGraphQLErrors, graphQLErrorBox } = useGraphQLErrorBox();
    const inputRef = useRef(null);

    const [updateUser, { loading }] = useUpdateUserMutation({
        update(cache, { data }) {
            const { me } = cache.readQuery({
                query: GET_ME,
            }) as GetMeQuery;

            if (me && data?.updateUser) {
                cache.writeQuery({
                    query: GET_ME,
                    data: {
                        me: {
                            ...me,
                            ...data.updateUser,
                        },
                    },
                });
            }
        },
    });

    /**
     * Focus on input when we go into editing mode.
     */
    React.useEffect(() => {
        if (!editing || !inputRef.current) {
            return;
        }

        const input = (inputRef.current as any).input;

        // If we are already focused, return.
        if (document.activeElement === input) {
            return;
        }

        input.focus();
    });

    async function onSave() {
        setClientValidationError('');

        const trimmedName = updatedName.trim();
        if (!trimmedName) {
            setClientValidationError('Username cannot be empty');
            return;
        }

        if (trimmedName.length < USER_NAME_MIN_LENGTH) {
            setClientValidationError('Username must be at least 4 characters long.');
            return;
        }

        if (trimmedName.length > USER_NAME_MAX_LENGTH) {
            setClientValidationError('Username cannot be greater than 20 characters long.');
            return;
        }

        /**
         * Note: without a try/catch, an unhandled promise rejection
         * from our mutation will crash the page.
         * https://github.com/apollographql/apollo-client/issues/3876
         */
        try {
            await updateUser({
                variables: {
                    fields: {
                        userName: trimmedName,
                    },
                },
            });
            reset(false);
            setUpdatedName(trimmedName);
        } catch (err) {
            /**
             * Keep track of graphQL errors in our own state so
             * that we can reset them upon closing the modal.
             */
            setGraphQLErrors(err.graphQLErrors);
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setUpdatedName(value);
    }

    function reset(resetUsername = true) {
        setEditing(false);
        setClientValidationError('');
        setGraphQLErrors([]);

        if (resetUsername) {
            setUpdatedName(userName);
        }
    }

    return (
        <>
            <StyledFormItem
                validateStatus={clientValidationError ? 'error' : undefined}
                help={clientValidationError}
            >
                <Input
                    ref={inputRef}
                    value={updatedName}
                    onChange={onChange}
                    placeholder="Enter user name"
                    maxLength={USER_NAME_MAX_LENGTH}
                    readOnly={!editing}
                    disabled={!editing}
                    addonBefore="Username"
                />
                <Controls>
                    {!editing ? (
                        <Button type="primary" ghost onClick={() => setEditing(true)}>
                            Edit
                        </Button>
                    ) : (
                        <StyledButtonGroup>
                            <Button onClick={() => reset()} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="primary" loading={loading} onClick={onSave}>
                                Save
                            </Button>
                        </StyledButtonGroup>
                    )}
                </Controls>
            </StyledFormItem>

            {graphQLErrorBox}
        </>
    );
};

export default EditUsername;

const StyledFormItem = styled(Form.Item)`
    margin-bottom: 0;

    & > div {
        width: 100%;
    }

    .ant-form-item-children {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
    }

    .ant-form-explain {
        margin-top: ${({ theme }) => theme.spacing(0)};
    }
`;

const Controls = styled.span`
    margin-left: ${({ theme }) => theme.spacing(1)};
`;

const StyledButtonGroup = styled(ButtonGroup)`
    display: flex;
`;
