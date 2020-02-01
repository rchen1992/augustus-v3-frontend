import { DefaultTheme } from 'styled-components';
import spacing from './spacing';
import colors, { Colors } from './colors';
import typography, { Typography } from './typography';
import media, { Media } from 'style/media';

export interface BaseTheme {
    spacing: (index: number | null, hIndex?: number | null) => string;
    spacingValues: (index: number) => number;
    colors: Colors;
    typography: Typography;
    media: Media;
}

const theme: DefaultTheme = {
    /**
     * Helper to return spacing in pixels.
     * If 1 number is provided, returns spacing for all directions.
     * If 2 numbers are provided, the first index acts as
     *  vertical spacing, and second index acts as horizontal spacing.
     *
     * Null indexes are treated as the value 0.
     */
    spacing: (index: number | null, hIndex?: number | null) => {
        let space = index === null ? '0px' : `${spacing[index]}px`;
        if (hIndex !== undefined) {
            space += hIndex === null ? '0px' : ` ${spacing[hIndex]}px`;
        }
        return space;
    },

    /**
     * Helper to return spacing values as a raw number.
     */
    spacingValues: (index: number) => {
        return spacing[index];
    },

    colors,
    typography,
    media,
};

export default theme;
