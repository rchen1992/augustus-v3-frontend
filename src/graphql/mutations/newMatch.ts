import { gql } from 'apollo-boost';
import matchFields from 'graphql/fragments/matchFields';

export default gql`
    mutation newMatch($input: NewMatchInput!) {
        newMatch(input: $input) {
            ...matchFields
        }
    }

    ${matchFields}
`;
