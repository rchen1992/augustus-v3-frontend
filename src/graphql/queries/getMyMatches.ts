import { gql } from 'apollo-boost';
import matchFields from 'graphql/fragments/matchFields';

export default gql`
    query getMyMatches {
        me {
            id
            matches {
                ...matchFields
            }
        }
    }

    ${matchFields}
`;
