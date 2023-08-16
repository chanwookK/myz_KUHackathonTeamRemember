import {createGlobalStyle} from 'styled-components'
import Reset from 'styled-reset'
import "./font.css";

const GlobalStyles = createGlobalStyle`
  ${Reset}

  *{
    box-sizing : border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }


  body {
    font-family : Pretendard;
    line-height : 1.5;
    margin : 0;
  }

  button {
    padding : 0;
    border : none;
    cursor : pointer;
    line-height : 0;
    font-family : Pretendard;
  }

  input , select , option {
    font-family : Pretendard
  }
`;

export default GlobalStyles;