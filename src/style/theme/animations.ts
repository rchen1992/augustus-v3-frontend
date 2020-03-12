import { FlattenSimpleInterpolation, css } from 'styled-components';
import { fadeReveal } from 'style/keyframes';

export interface Animations {
    fadeReveal: FlattenSimpleInterpolation;
}

export default {
    fadeReveal: css`
        animation: ${fadeReveal} 0.3s ease-in;
    `,
};
