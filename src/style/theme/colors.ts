export interface Colors {
    seaGreen: string;
    yellow: string;
    primary: string;
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
    selectiveYellow: '#FFBA08',
    bloodRed: '#B80C09',
    grayValues: grays,
};

const namedColors = {
    primary: colors.seaGreen,
};

export default {
    ...colors,
    ...namedColors,

    gray: (index: number) => grays[index],
};
