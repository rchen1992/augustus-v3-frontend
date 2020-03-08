import { gql } from 'apollo-boost';

export default gql`
    query getMe {
        me {
            id
            userName
            avatarUrl
        }
    }
`;
