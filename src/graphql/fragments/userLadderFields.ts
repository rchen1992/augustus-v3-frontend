import { gql } from 'apollo-boost';

export default gql`
    fragment userLadderFields on LadderUser {
        id
        rating
        ratingDelta
        rank
        matchStats {
            matchCount
            winCount
            lossCount
            tieCount
        }
        ladder {
            id
            ladderName
            inviteToken
        }
    }
`;
