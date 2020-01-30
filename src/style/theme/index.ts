import { DefaultTheme } from 'styled-components';
import spacing from './spacing';
import colors, { Colors } from './colors';
import typography, { Typography } from './typography';

export interface BaseTheme {
    spacing: (index: number) => string;
    spacingValues: (index: number) => number;
    colors: Colors;
    typography: Typography;
}

const theme: DefaultTheme = {
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

export default theme;
