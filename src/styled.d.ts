// import original module declarations
import 'styled-components';
import { Theme } from 'style/theme';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme extends BaseTheme {}
}