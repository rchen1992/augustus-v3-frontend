import GET_MY_LADDERS from 'graphql/queries/getMyLadders';

export const mockLadderUsers = [
    {
        id: '1',
        userName: 'Test user',
    },
    {
        id: '2',
        userName: 'Yolo Swag',
    },
];

export const getLadderUsersQuerySuccessMock = {
    request: {
        query: GET_MY_LADDERS,
    },
    result: {
        data: {
            ladder: {
                id: '1',
                users: mockLadderUsers,
            },
        },
    },
};
