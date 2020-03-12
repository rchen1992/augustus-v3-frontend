import React, { useEffect, useRef } from 'react';

interface Options {
    targetNumber: number;
    startNumber?: number;
    changePerTick?: number;
    tickSpeed?: number;
    element: React.MutableRefObject<any>;
}

/**
 * Animates a number to its target.
 *
 * Currently only handles animating upwards,
 * but should be easily adjustable to count downwards.
 */
export default ({
    startNumber = 0,
    targetNumber,
    element,
    changePerTick = 10,
    tickSpeed = 10,
}: Options) => {
    const currentNumber = useRef(startNumber);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentNumber.current >= targetNumber) {
                clearInterval(interval);
                return;
            }

            /**
             * If our rate of change is larger than the difference between the
             * current number and the target number, we lower the rate of change to 1
             * to make sure we hit the target number exactly.
             */
            if (targetNumber - currentNumber.current < changePerTick) {
                currentNumber.current += 1;
            } else {
                currentNumber.current += changePerTick;
            }

            requestAnimationFrame(() => {
                element.current.innerHTML = currentNumber.current;
            });
        }, tickSpeed);

        return () => clearInterval(interval);
    }, []);

    return {
        currentNumber,
    };
};
