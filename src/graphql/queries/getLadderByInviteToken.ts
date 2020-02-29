import { gql } from 'apollo-boost';

export default gql`
    query getLadderByInviteToken($token: String!) {
        ladderByInviteToken(token: $token) {
            id
            ladderName
        }
    }
`;
