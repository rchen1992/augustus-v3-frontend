import { gql } from 'apollo-boost';
import matchFields from 'graphql/fragments/matchFields';

export default gql`
    query getLadderMatches($id: ID!) {
        ladder(id: $id) {
            id
            matches {
                ...matchFields
            }
        }
    }

    ${matchFields}
`;
