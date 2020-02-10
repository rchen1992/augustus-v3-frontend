import { gql } from 'apollo-boost';

export default gql`
    fragment matchFields on Match {
        id
        tied
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
        ladder {
            id
            ladderName
        }
        winner {
            id
            userName
        }
    }
`;
