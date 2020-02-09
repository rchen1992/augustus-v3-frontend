import GET_MY_LADDERS from 'graphql/queries/getMyLadders';

export const mockLadders = [
    {
        id: '1',
        ladderName: 'Test Ladder',
        inviteToken: 'assdf',
        userRating: 1000,
        userRatingDelta: 0,
        userRank: 1,
        userMatchStats: {
            matchCount: 4,
            winCount: 2,
            lossCount: 1,
            tieCount: 1,
        },
    },
    {
        id: '2',
        ladderName: 'Numero Dos',
        inviteToken: 'wuehf',
        userRating: 1100,
        userRatingDelta: 100,
        userRank: 2,
        userMatchStats: {
            matchCount: 5,
            winCount: 2,
            lossCount: 2,
            tieCount: 1,
        },
    },
];

const getMyLaddersQuerySuccessMock = {
    request: {
        query: GET_MY_LADDERS,
    },
    result: {
        data: {
            me: {
                id: '1',
                ladders: mockLadders,
            },
        },
    },
};

export { getMyLaddersQuerySuccessMock };
