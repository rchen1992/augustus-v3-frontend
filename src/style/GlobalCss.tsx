import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        font-family: ${({ theme }) => theme.typography.fontFamily};
        font-size: ${({ theme }) => theme.typography.fontSize};
    }

    h1 {
        font-size: ${({ theme }) => theme.typography.h1.fontSize};
    }

    h2 {
        font-size: ${({ theme }) => theme.typography.h2.fontSize};
    }

    h3 {
        font-size: ${({ theme }) => theme.typography.h3.fontSize};
    }

    h4 {
        font-size: ${({ theme }) => theme.typography.h4.fontSize};
    }

    h5 {
        font-size: ${({ theme }) => theme.typography.h5.fontSize};
    }

    h6 {
        font-size: ${({ theme }) => theme.typography.h6.fontSize};
    }

`;
