import { useEffect, useState } from 'react';
import { Breakpoint } from 'style/media';

export function getMediaQueryBreakpointStrings(breakpoints: Breakpoint[]) {
    return breakpoints.map(bp => `(min-width: ${bp}px)`);
}

/**
 * Taken from https://usehooks.com/useMedia/.
 *
 * Sample usage:
 * const columnCount = useMedia(
 *   ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
 *   [5, 4, 3], // array of values to associate with each media breakpoint
 *   2 // default if value doesn't exist in above array
 * );
 */
export default function useMedia(queries: string[], values: any[], defaultValue: any) {
    // Array containing a media query list for each query
    const mediaQueryLists = queries.map(q => window.matchMedia(q));

    // Function that gets value based on matching media query
    const getValue = () => {
        // Get index of first media query that matches
        const index = mediaQueryLists.findIndex(mql => mql.matches);
        // Return related value or defaultValue if none
        return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };

    // State and setter for matched value
    const [value, setValue] = useState(getValue);

    useEffect(
        () => {
            // Event listener callback
            // Note: By defining getValue outside of useEffect we ensure that it has
            // current values of hook args (as this hook only runs on mount/dismount).
            const handler = () => setValue(getValue);
            // Set a listener for each media query with above handler as callback.
            mediaQueryLists.forEach(mql => mql.addListener(handler));
            // Remove listeners on cleanup
            return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
        },
        [] // Empty array ensures effect is only run on mount and unmount
    );

    return value;
}
