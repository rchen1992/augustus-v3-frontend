import { gql } from 'apollo-boost';

export default gql`
    query getLadderUsers($id: ID!) {
        ladder(id: $id) {
            id
            users {
                id
                userName
            }
        }
    }
`;
