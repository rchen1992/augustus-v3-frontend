import { gql } from 'apollo-boost';

export default gql`
    query getLadderRankings($id: ID!, $ladderUsersOrderBy: LadderUsersOrderBy) {
        ladder(id: $id) {
            id
            users(orderBy: $ladderUsersOrderBy) {
                id
                userName
                avatarUrl
                rating
                ratingDelta
                rank
                ladderJoinDate
            }
        }
    }
`;
