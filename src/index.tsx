import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';

ReactDOM.render(
    <div>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </div>,
    document.getElementById('root')
);
