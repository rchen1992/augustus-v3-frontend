import { gql } from 'apollo-boost';
import matchFields from 'graphql/fragments/matchFields';

export default gql`
    query getMyMatches($offset: Int, $limit: Int) {
        me {
            id
            matches(offset: $offset, limit: $limit) @connection(key: "matches") {
                ...matchFields
            }
            matchCount
        }
    }

    ${matchFields}
`;
