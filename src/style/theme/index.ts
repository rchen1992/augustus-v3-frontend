import spacing from './spacing';
import colors from './colors';
import typography from './typography';

export default {
    /**
     * Helper to return spacing in pixels.
     */
    spacing: (index: number) => {
        return `${spacing[index]}px`;
    },

    /**
     * Helper to return spacing as a raw number.
     */
    spacingValues: (index: number) => {
        return spacing[index];
    },

    colors,
    typography,
};
