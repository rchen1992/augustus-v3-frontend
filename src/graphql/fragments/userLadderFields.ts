import { gql } from 'apollo-boost';

export default gql`
    fragment userLadderFields on Ladder {
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
`;
