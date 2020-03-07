import { gql } from 'apollo-boost';

export default gql`
    query getLadderRankings($id: ID!, $ladderUsersOrderBy: LadderUsersOrderBy) {
        ladder(id: $id) {
            id
            ladderUsers(orderBy: $ladderUsersOrderBy) {
                id
                rating
                ratingDelta
                rank
                joinDate
                user {
                    id
                    userName
                    avatarUrl
                }
            }
        }
    }
`;
