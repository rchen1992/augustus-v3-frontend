import { gql } from 'apollo-boost';
import matchFields from 'graphql/fragments/matchFields';

export default gql`
    query getLadderPage(
        $id: ID!
        $ladderUsersOrderBy: LadderUsersOrderBy
        $matchOffset: Int
        $matchLimit: Int
    ) {
        ladder(id: $id) {
            id
            ladderName
            users(orderBy: $ladderUsersOrderBy) {
                id
                userName
                avatarUrl
                rating
                ratingDelta
                rank
                ladderJoinDate
            }
            matches(offset: $matchOffset, limit: $matchLimit) {
                ...matchFields
            }
        }
    }

    ${matchFields}
`;
