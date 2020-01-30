export interface Colors {
    seaGreen: string;
    primary: string;
}

const colors = {
    seaGreen: 'hsl(161, 70%, 38.1%)',
};

const namedColors = {
    primary: colors.seaGreen,
};

export default {
    ...colors,
    ...namedColors,
};
