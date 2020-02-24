import { gql } from 'apollo-boost';
import matchFields from 'graphql/fragments/matchFields';

export default gql`
    query getLadderMatches($id: ID!, $offset: Int, $limit: Int) {
        ladder(id: $id) {
            id
            matches(offset: $offset, limit: $limit) {
                ...matchFields
            }
            matchCount
        }
    }

    ${matchFields}
`;
