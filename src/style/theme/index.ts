import { DefaultTheme } from 'styled-components';
import spacing from './spacing';
import colors, { Colors } from './colors';
import typography, { Typography } from './typography';
import shape, { Shape } from './shape';
import media, { Media } from 'style/media';
import animations, { Animations } from './animations';

export interface BaseTheme {
    spacing: (
        index: number | null,
        hIndex?: number | null,
        bIndex?: number | null,
        lIndex?: number | null
    ) => string;
    spacingValues: (index: number) => number;
    colors: Colors;
    typography: Typography;
    shape: Shape;
    media: Media;
    animations: Animations;
}

const theme: DefaultTheme = {
    /**
     * Helper to return spacing in pixels.
     * If 1 number is provided, returns spacing for all directions.
     * If 2 numbers are provided, the first index acts as
     *  vertical spacing, and second index acts as horizontal spacing.
     * If 3-4 numbers are provided, indexes correspond to TOP, RIGHT, BOTTOM, LEFT sides.
     *
     * Null indexes are treated as the value 0.
     *
     * Similar to specifying padding in CSS, you cannot leave undefined
     * values between other values. The function will return as soon as
     * it hits an undefined value.
     */
    spacing: (
        index: number | null,
        hIndex?: number | null,
        bIndex?: number | null,
        lIndex?: number | null
    ) => {
        let space = index === null ? '0px' : `${spacing[index]}px`;

        if (hIndex === undefined) {
            return space;
        }

        space += hIndex === null ? '0px' : ` ${spacing[hIndex]}px`;

        if (bIndex === undefined) {
            return space;
        }

        space += bIndex === null ? '0px' : ` ${spacing[bIndex]}px`;

        if (lIndex === undefined) {
            return space;
        }

        space += lIndex === null ? '0px' : ` ${spacing[lIndex]}px`;
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
    shape,
    media,
    animations,
};

export default theme;
