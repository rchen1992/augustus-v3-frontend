import { gql } from 'apollo-boost';

export default gql`
    query getMyLadders {
        me {
            id
            ladders {
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
    }
`;
