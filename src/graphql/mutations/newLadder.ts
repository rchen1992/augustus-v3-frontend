import { gql } from 'apollo-boost';
import userLadderFields from 'graphql/fragments/userLadderFields';

export default gql`
    mutation newLadder($ladderName: String!) {
        newLadder(ladderName: $ladderName) {
            ...userLadderFields
        }
    }

    ${userLadderFields}
`;
