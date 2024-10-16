// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: ${({ theme }) => theme.fonts.main};
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: ${({ theme }) => theme.colors.text};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Фоновые переменные */
    --s: ${({ theme }) => theme.sizes.backgroundPatternSize};
    --c1: ${({ theme }) => theme.colors.backgroundPatternColor1};
    --c2: ${({ theme }) => theme.colors.backgroundPatternColor2};
    --t1: ${({ theme }) => theme.colors.backgroundPatternTransparent1};
    --t2: ${({ theme }) => theme.colors.backgroundPatternTransparent2};
    --p3: ${({ theme }) => theme.colors.backgroundPatternColor3};
    --p4: ${({ theme }) => theme.colors.backgroundPatternColor4};
  }

  body, #root {
    margin: 0;
    padding: 0;
    min-height: 100vh;

    /* Применение фонового паттерна */
    --_g: var(--t1) 25%, var(--t2) 47%, var(--c1) 53% 147%, var(--c2) 153% 247%,
          var(--c1) 253% 347%, var(--c2) 353% 447%, var(--c1) 453% 547%, var(--t2) 553%,
          var(--t1) 575%;
    --_s: calc(25% / 3) calc(25% / 4) at 50%;

    background: radial-gradient(var(--_s) 100%, var(--_g)),
                radial-gradient(var(--_s) 100%, var(--_g)) calc(var(--s) / 2) calc(3 * var(--s) / 4),
                radial-gradient(var(--_s) 0, var(--_g)) calc(var(--s) / 2) 0,
                radial-gradient(var(--_s) 0, var(--_g)) 0 calc(3 * var(--s) / 4),
                repeating-linear-gradient(
                  90deg,
                  var(--p3) calc(25% / -6) calc(25% / 6),
                  var(--p4) 0 calc(25% / 2)
                );
    background-size: var(--s) calc(3 * var(--s) / 2);

    /* Добавление анимации фона */
    animation: animateBackground 60s linear infinite;

    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  /* Ключевые кадры для анимации фона */
  @keyframes animateBackground {
    0% {
      background-position:
        0 0,
        calc(var(--s) / 2) calc(3 * var(--s) / 4),
        calc(var(--s) / 2) 0,
        0 calc(3 * var(--s) / 4),
        0 0;
    }
    100% {
      background-position:
        100% 100%,
        calc(var(--s) / 2 + 100%) calc(3 * var(--s) / 4 + 100%),
        calc(var(--s) / 2 + 100%) 100%,
        100% calc(3 * var(--s) / 4 + 100%),
        100% 100%;
    }
  }

  a {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.link};
    text-decoration: inherit;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  h1 {
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    line-height: 1.1;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  }
`;

export default GlobalStyle;
