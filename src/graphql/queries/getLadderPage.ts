import { gql } from 'apollo-boost';

export default gql`
    query getLadderPage($id: ID!) {
        ladder(id: $id) {
            id
            ladderName
            users {
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
