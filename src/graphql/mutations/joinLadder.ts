import { gql } from 'apollo-boost';
import userLadderFields from 'graphql/fragments/userLadderFields';

export default gql`
    mutation joinLadder($token: String!) {
        joinLadder(token: $token) {
            ...userLadderFields
        }
    }

    ${userLadderFields}
`;
