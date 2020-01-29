import { gql } from 'apollo-boost';

export default gql`
    {
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
