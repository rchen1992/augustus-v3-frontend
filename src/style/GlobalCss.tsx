import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        font-family: ${({ theme }) => theme.typography.fontFamily};
    }
`;
