import { gql } from 'apollo-boost';

export default gql`
    fragment matchFields on Match {
        id
        tied
        createdAt
        user1 {
            id
            userName
        }
        user2 {
            id
            userName
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
