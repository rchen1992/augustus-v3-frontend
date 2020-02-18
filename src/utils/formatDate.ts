/**
 * Formats timestamp into date string for display.
 */
export default (timestamp: string) => {
    return new Date(parseInt(timestamp)).toLocaleDateString();
};
