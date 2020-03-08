import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { USER_NAME_MAX_LENGTH } from 'utils/constants';
import { useGetMeQuery } from 'graphql/generated';
// import GET_MY_LADDERS from 'graphql/queries/getMyLadders';
import styled from 'styled-components';
import useGraphQLErrorBox from 'hooks/useGraphQLErrorBox';

interface EditUsernameProps {
    userName: string;
}

const { Group: ButtonGroup } = Button;

const EditUsername: React.FC<EditUsernameProps> = ({ userName }) => {
    const [editing, setEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(userName);
    const [clientValidationError, setClientValidationError] = useState(false);
    const { setGraphQLErrors, graphQLErrorBox } = useGraphQLErrorBox();

    // const [newLadder, { loading }] = useNewLadderMutation({
    //     update(cache, { data }) {
    //         const { me } = cache.readQuery({
    //             query: GET_MY_LADDERS,
    //         }) as GetMyLaddersQuery;

    //         if (me?.userLadders && data?.newLadder) {
    //             cache.writeQuery({
    //                 query: GET_MY_LADDERS,
    //                 data: {
    //                     me: {
    //                         ...me,
    //                         userLadders: me.userLadders.concat([data.newLadder]),
    //                     },
    //                 },
    //             });
    //         }
    //     },
    // });

    async function onSubmit() {
        // setClientValidationError(false);

        // const trimmedLadderName = updatedName.trim();
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
            //     variables: { updatedName: trimmedLadderName },
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

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setUpdatedName(value);
    }

    function reset() {
        setEditing(false);
        // setUpdatedName(userName);
        setClientValidationError(false);
        setGraphQLErrors([]);
    }

    return (
        <>
            <StyledFormItem
                validateStatus={clientValidationError ? 'error' : undefined}
                help={clientValidationError && 'User name cannot be empty'}
            >
                <Input
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
                            <Button onClick={() => setEditing(false)}>Cancel</Button>
                            <Button type="primary">Save</Button>
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
`;

const Controls = styled.span`
    margin-left: ${({ theme }) => theme.spacing(1)};
`;

const StyledButtonGroup = styled(ButtonGroup)`
    display: flex;
`;
