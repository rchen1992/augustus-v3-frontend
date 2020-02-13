import { lighten } from 'polished';

export interface Colors {
    seaGreen: string;
    yellow: string;
    red: string;
    textGray: string;
    primary: string;
    secondary: string;
    error: string;
    errorLight: string;
    grayValues: string[];
    gray: (index: number) => string;
}

export const grays = [
    'hsl(204, 8%, 98%)',
    'hsl(204, 8%, 95%)',
    'hsl(204, 8%, 90%)',
    'hsl(204, 8%, 86%)',
    'hsl(204, 8%, 81%)',
    'hsl(204, 8%, 76%)',
    'hsl(204, 5%, 67%)',
    'hsl(204, 4%, 58%)',
    'hsl(204, 3%, 49%)',
    'hsl(204, 3%, 40%)',
];

const colors = {
    seaGreen: 'hsl(161, 70%, 38.1%)',
    yellow: 'hsl(45, 100%, 60%)',
    red: 'hsl(357, 91%, 55%)',
    textGray: 'hsla(0, 0%, 0%, 0.45)',
    grayValues: grays,
};

const namedColors = {
    primary: colors.seaGreen,
    secondary: colors.yellow,
    error: colors.red,
};

const colorShades = {
    errorLight: lighten(0.4, namedColors.error),
};

export default {
    ...colors,
    ...namedColors,
    ...colorShades,

    gray: (index: number) => grays[index],
};
