import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';

export function renderWithProvider(element: React.ReactElement, mocks?: readonly MockedResponse[]) {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>{element}</BrowserRouter>
            </ThemeProvider>
        </MockedProvider>
    );
}
