import { gql } from 'apollo-boost';
import userLadderFields from 'graphql/fragments/userLadderFields';

export default gql`
    query getMyLadders {
        me {
            id
            userLadders {
                ...userLadderFields
            }
        }
    }

    ${userLadderFields}
`;
