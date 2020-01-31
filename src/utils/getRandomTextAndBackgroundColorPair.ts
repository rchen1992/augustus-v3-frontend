interface ColorPair {
    textColor: string;
    bgColor: string;
}

/**
 * Takes any string of at least 3 characters and returns an array of 3 ints
 * where every int is between 40 - 250 (inclusive)
 */
const stringToRgb = (s: string) => {
    return Array.from(btoa(s).substring(0, 3)).map(char => parseInt(char, 36) * 6 + 40);
};

/**
 * Returns true if rgb color is perceived as dark.
 */
const isRgbDark = ([red, green, blue]: number[]) => {
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue < 100;
};

/**
 * returns contrasting color to rgb color as hex string
 * @param {Number[]} rgb - 3 integers, red, green, blue
 */
const getConstrastingColor = (rgb: number[]) => {
    return isRgbDark(rgb) ? '#fff' : '#000';
};

/**
 * Returns rgb string for use in CSS styles.
 */
const rgbArrayToString = ([red, green, blue]: number[]) => {
    return `rgb(${red}, ${green}, ${blue})`;
};

/**
 * Takes a string and generates a random color in RGB.
 * This is the background color.
 *
 * Then determines the contrasting color to show with it (black or white).
 * This is the text color.
 *
 * Returns values as tuple.
 */
const getRandomTextAndBackgroundColorPair = (s: string): ColorPair => {
    const rgb = stringToRgb(s);
    const textColor = getConstrastingColor(rgb);
    const bgColor = rgbArrayToString(rgb);

    return {
        textColor,
        bgColor,
    };
};

export default getRandomTextAndBackgroundColorPair;
