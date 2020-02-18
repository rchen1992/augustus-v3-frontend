import { gql } from 'apollo-boost';

export default gql`
    query getLadderName($id: ID!) {
        ladder(id: $id) {
            id
            ladderName
        }
    }
`;
