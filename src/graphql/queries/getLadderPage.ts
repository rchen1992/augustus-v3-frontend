import { gql } from 'apollo-boost';

export default gql`
    query getLadderPage($id: ID!, $ladderUsersOrderBy: LadderUsersOrderBy) {
        ladder(id: $id) {
            id
            ladderName
            users(orderBy: $ladderUsersOrderBy) {
                id
                userName
                avatarUrl
                rating
                ratingDelta
                rank
                ladderJoinDate
            }
            matches {
                id
                createdAt
                user1 {
                    id
                    userName
                    avatarUrl
                }
                user2 {
                    id
                    userName
                    avatarUrl
                }
                winner {
                    id
                    userName
                }
            }
        }
    }
`;
