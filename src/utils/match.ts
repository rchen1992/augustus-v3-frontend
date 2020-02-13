import { GetMyMatchesQueryMatch } from 'types';

/**
 * Given a match and the current user ID,
 * returns the opponent from that match.
 */
export const getMatchOpponent = (match: GetMyMatchesQueryMatch, userId: string) => {
    if (match.user1.id === userId) {
        return match.user2;
    }

    if (match.user2.id === userId) {
        return match.user1;
    }

    throw new Error('User is not part of this match.');
};

/**
 * Get display text for match result.
 */
export const getMatchResultText = (match: GetMyMatchesQueryMatch, userId: string) => {
    if (match.tied) {
        return 'Tie';
    }

    if (match?.winner?.id === userId) {
        return 'Win';
    }

    return 'Loss';
};
