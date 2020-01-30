import { DefaultTheme } from 'styled-components';
import spacing from './spacing';
import colors, { Colors } from './colors';
import typography, { Typography } from './typography';

export interface BaseTheme {
    spacing: (index: number, hIndex: number) => string;
    spacingValues: (index: number) => number;
    colors: Colors;
    typography: Typography;
}

const theme: DefaultTheme = {
    /**
     * Helper to return spacing in pixels.
     * If 1 number is provided, returns spacing for all directions.
     * If 2 numbers are provided, the first index acts as
     *  vertical spacing, and second index acts as horizontal spacing.
     */
    spacing: (index: number, hIndex?: number) => {
        let space = `${spacing[index]}px`;
        if (hIndex) {
            space += ` ${spacing[hIndex]}px`;
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
};

export default theme;
