/**
 * Formats timestamp into date string for display.
 */
export default (timestamp: string) => {
    return new Date(parseInt(timestamp)).toLocaleDateString();
};

/**
 * Formats timestamp into date string for display,
 * but leaves out the year so that the date is shorter.
 *
 * Useful for saving space on mobile.
 */
export const formatShortDate = (timestamp: string) => {
    const dateString = new Date(parseInt(timestamp)).toLocaleDateString();
    const parts = dateString.split('/');
    return parts.slice(0, 2).join('/');
};
