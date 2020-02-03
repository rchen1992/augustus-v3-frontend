import { gql } from 'apollo-boost';

export default gql`
    mutation newLadder($ladderName: String!) {
        newLadder(ladderName: $ladderName) {
            id
            ladderName
            inviteToken
            userRating
            userRatingDelta
            userRank
            userMatchStats {
                matchCount
                winCount
                lossCount
                tieCount
            }
        }
    }
`;
