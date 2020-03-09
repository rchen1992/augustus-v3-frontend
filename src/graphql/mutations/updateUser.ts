import { gql } from 'apollo-boost';

export default gql`
    mutation updateUser($fields: UpdateUserInput!) {
        updateUser(fields: $fields) {
            id
            userName
        }
    }
`;
