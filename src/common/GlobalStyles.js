import { createGlobalStyle} from "styled-components"
//ㅅㄷㄴㅅㅅ
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 1s linear;
  }
  `