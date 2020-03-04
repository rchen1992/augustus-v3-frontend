import React from 'react';
import AppLayout from 'components/AppLayout';
import styled from 'styled-components';
import { Button } from 'antd';
import {
    useGetLadderByInviteTokenQuery,
    useGetMyLaddersQuery,
    useJoinLadderMutation,
    GetMyLaddersQuery,
} from 'graphql/generated';
import GET_MY_LADDERS from 'graphql/queries/getMyLadders';
import FullscreenSpin from 'components/FullscreenSpin';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import GenericError from 'components/GenericError';

function LadderInvite() {
    const { token } = useParams();
    const history = useHistory();

    const {
        loading: ladderByInviteTokenLoading,
        error: ladderByInviteError,
        data: ladderByInviteTokenData,
    } = useGetLadderByInviteTokenQuery({
        variables: {
            token: token!,
        },
    });

    const {
        loading: myLaddersLoading,
        error: myLaddersError,
        data: myLaddersData,
    } = useGetMyLaddersQuery();

    const [
        joinLadder,
        { loading: joinLadderLoading, error: joinLadderError },
    ] = useJoinLadderMutation({
        update(cache, { data }) {
            const { me } = cache.readQuery({
                query: GET_MY_LADDERS,
            }) as GetMyLaddersQuery;

            if (me?.ladders && data?.joinLadder) {
                cache.writeQuery({
                    query: GET_MY_LADDERS,
                    data: {
                        me: {
                            ...me,
                            ladders: me.ladders.concat([data.joinLadder]),
                        },
                    },
                });
            }
        },
    });

    if (ladderByInviteTokenLoading || myLaddersLoading) {
        return <FullscreenSpin />;
    }

    if (
        ladderByInviteError ||
        myLaddersError ||
        joinLadderError ||
        !ladderByInviteTokenData?.ladderByInviteToken
    ) {
        return <GenericError fullscreen showBackToHome />;
    }

    const alreadyInLadder =
        myLaddersData?.me?.ladders &&
        ladderByInviteTokenData?.ladderByInviteToken &&
        myLaddersData.me.ladders.some(
            ladder => ladder.id === ladderByInviteTokenData?.ladderByInviteToken?.id
        );

    if (alreadyInLadder) {
        return <Redirect to="/" />;
    }

    const onJoinLadder = async () => {
        try {
            await joinLadder({
                variables: {
                    token: token!,
                },
            });

            history.push('/');
        } catch {}
    };

    return (
        <AppLayout>
            <Container>
                <div>
                    <h1>
                        You've been invited to join{' '}
                        {ladderByInviteTokenData?.ladderByInviteToken.ladderName}!
                    </h1>
                    <Button onClick={onJoinLadder} type="primary" loading={joinLadderLoading}>
                        Join now
                    </Button>
                </div>
            </Container>
        </AppLayout>
    );
}

export default LadderInvite;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    text-align: center;
`;
