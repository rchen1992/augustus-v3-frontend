import React, { useEffect, useRef } from 'react';

interface Options {
    /**
     * The number to animate to.
     */
    targetNumber: number;

    /**
     * The number to start at.
     */
    startNumber?: number;

    /**
     * The rate of change of the number for every tick of the animation.
     */
    changePerTick?: number;

    /**
     * The rate of change of the number for every tick of the animation,
     * after the animation has already run once.
     * This can be used to differentiate between the initial animation and
     * any follow up animations that may change the current state of the number.
     */
    changePerTickAfterInitialRun?: number;

    /**
     * How many milliseconds elapse in between each tick of the animation.
     */
    tickSpeed?: number;

    /**
     * The React ref of the DOM element to operate on.
     * The animation will change the innerHTML of this element.
     */
    element: React.MutableRefObject<any>;
}

/**
 * Animates a number to its target.
 */
export default ({
    startNumber = 0,
    targetNumber,
    element,
    changePerTick = 10,
    changePerTickAfterInitialRun = 1,
    tickSpeed = 10,
}: Options) => {
    const currentNumber = useRef(startNumber);

    useEffect(() => {
        /**
         * Are we animating to a higher number of lower number?
         */
        const goingUp = targetNumber - currentNumber.current > 0;

        /**
         * Has this animation run at least once?
         */
        const finishedInitialRun = currentNumber.current !== startNumber;

        const interval = setInterval(() => {
            if (
                currentNumber.current === targetNumber ||
                (goingUp && currentNumber.current > targetNumber) ||
                (!goingUp && currentNumber.current < targetNumber)
            ) {
                clearInterval(interval);
                return;
            }

            /**
             * Determine how much we are changing, regardless of direction.
             *
             * If our rate of change is larger than the difference between the
             * current number and the target number, we forcefully lower the magnitude to 1
             * to make sure we hit the target number exactly.
             *
             * If we've already run the animation once, we should use `changePerTickAfterInitialRun`.
             */
            let changeMagnitude = changePerTick;
            if (Math.abs(targetNumber - currentNumber.current) < changePerTick) {
                changeMagnitude = 1;
            } else if (finishedInitialRun) {
                changeMagnitude = changePerTickAfterInitialRun;
            }

            const changeDirection = goingUp ? 1 : -1;

            currentNumber.current += changeMagnitude * changeDirection;

            requestAnimationFrame(() => {
                element.current.innerHTML = currentNumber.current;
            });
        }, tickSpeed);

        return () => clearInterval(interval);
    }, [targetNumber]);

    return {
        currentNumber,
    };
};
