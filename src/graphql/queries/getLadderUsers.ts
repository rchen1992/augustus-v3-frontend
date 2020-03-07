import { gql } from 'apollo-boost';

export default gql`
    query getLadderUsers($id: ID!) {
        ladder(id: $id) {
            id
            ladderUsers {
                id
                user {
                    id
                    userName
                }
            }
        }
    }
`;
