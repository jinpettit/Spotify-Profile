import { css } from 'styled-components/macro';

const fonts = css`
  @font-face {
    font-family: 'Gotham';
    src: url('../fonts/GothamBook.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('../fonts/GothamBold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('../fonts/GothamBlack.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;