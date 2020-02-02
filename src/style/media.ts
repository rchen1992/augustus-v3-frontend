import { css, ThemedCssFunction, DefaultTheme } from 'styled-components';

export interface Media {
    [x: string]: ThemedCssFunction<DefaultTheme>;
}

const breakpoints = {
    xs: 0,
    sm: 600,
    smd: 780,
    md: 960,
    mlg: 1120,
    lg: 1280,
    xl: 1920,
};

const media: Media = (Object.keys(breakpoints) as (keyof typeof breakpoints)[]).reduce(
    (result, breakpoint) => {
        result[breakpoint] = (first: any, ...interpolations: any[]) => css`
            @media (min-width: ${breakpoints[breakpoint]}px) {
                ${css(first, ...interpolations)}
            }
        `;

        return result;
    },
    {} as { [key in keyof typeof breakpoints]: ThemedCssFunction<DefaultTheme> }
);

export default media;
