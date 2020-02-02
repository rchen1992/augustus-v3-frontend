import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Rank from 'components/Rank';
import { renderWithProvider } from 'tests/testUtils';

afterEach(cleanup);

describe('Rank', () => {
    test('should render rank 1st', () => {
        const { container } = renderWithProvider(<Rank rank={1} />);
        expect(container.textContent).toMatch('1st');
    });

    test('should render rank 2nd', () => {
        const { container } = renderWithProvider(<Rank rank={2} />);
        expect(container.textContent).toMatch('2nd');
    });

    test('should render rank 3rd', () => {
        const { container } = renderWithProvider(<Rank rank={3} />);
        expect(container.textContent).toMatch('3rd');
    });

    test('should render rank 4th - 20th', () => {
        for (let i = 4; i < 21; i++) {
            const { container } = renderWithProvider(<Rank rank={i} />);
            expect(container.textContent).toMatch(`${i}th`);
        }
    });

    test('should render rank 21st, 31st, 41st, etc', () => {
        for (let i = 21; i < 100; i += 10) {
            const { container } = renderWithProvider(<Rank rank={i} />);
            expect(container.textContent).toMatch(`${i}st`);
        }
    });

    test('should render rank 21nd, 31nd, 41nd, etc', () => {
        for (let i = 22; i < 100; i += 10) {
            const { container } = renderWithProvider(<Rank rank={i} />);
            expect(container.textContent).toMatch(`${i}nd`);
        }
    });

    test('should render rank 21rd, 31rd, 41rd, etc', () => {
        for (let i = 23; i < 100; i += 10) {
            const { container } = renderWithProvider(<Rank rank={i} />);
            expect(container.textContent).toMatch(`${i}rd`);
        }
    });
});
