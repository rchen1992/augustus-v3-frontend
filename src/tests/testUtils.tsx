import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import { BrowserRouter } from 'react-router-dom';

export function renderWithProvider(element: React.ReactElement) {
    return render(
        <ThemeProvider theme={theme}>
            <BrowserRouter>{element}</BrowserRouter>
        </ThemeProvider>
    );
}
