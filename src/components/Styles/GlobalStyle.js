// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

// Создаем глобальные стили с помощью styled-components
const GlobalStyle = createGlobalStyle`
  /* Селектор :root применяется к корневому элементу документа (обычно это <html>) */
  :root { 
    /* Устанавливаем основную семейство шрифтов из темы */
    font-family: ${({ theme }) => theme.fonts.main};
    /* Задаем межстрочный интервал */
    line-height: 1.5;
    /* Устанавливаем базовый вес шрифта */
    font-weight: 400;
    /* Указываем поддержку цветовых схем (светлая и темная) */
    color-scheme: light dark;
    /* Устанавливаем основной цвет текста из темы */
    color: ${({ theme }) => theme.colors.text};
    /* Устанавливаем цвет фона из темы */
    background-color: ${({ theme }) => theme.colors.background};
    /* Отключаем синтез шрифтов (например, предотвращаем автоматическое наклонение) */
    font-synthesis: none;
    /* Оптимизируем рендеринг текста для лучшей читаемости */
    text-rendering: optimizeLegibility;
    /* Улучшаем сглаживание шрифтов в WebKit и macOS */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Стили для body и корневого элемента #root */
  body, #root {
    /* Убираем отступы и поля по умолчанию */
    margin: 0;
    padding: 0;
    /* Задаем минимальную высоту для отображения на всю высоту окна */
    min-height: 100vh;
    /* Устанавливаем цвет фона из темы */
    background-color: ${({ theme }) => theme.colors.background};
  }

  /* Стили для всех ссылок */
  a {
    /* Устанавливаем вес шрифта для ссылок */
    font-weight: 500;
    /* Устанавливаем цвет текста ссылки из темы */
    color: ${({ theme }) => theme.colors.link};
    /* Наследуем декорации текста (например, подчеркивание) */
    text-decoration: inherit;
  }

  /* Стили для ссылок при наведении курсора */
  a:hover {
    /* Изменяем цвет текста ссылки при наведении из темы */
    color: ${({ theme }) => theme.colors.linkHover};
  }

  /* Стили для заголовков h1 */
  h1 {
    /* Устанавливаем размер шрифта для заголовка из темы */
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    /* Задаем межстрочный интервал для заголовка */
    line-height: 1.1;
  }

  /* Медиа-запрос для предпочтительной цветовой схемы (светлая тема) */
  @media (prefers-color-scheme: light) {
    /* Переопределяем стили для светлой темы */
    :root {
      /* Устанавливаем цвет текста для светлой темы */
      color: #213547;
      /* Устанавливаем цвет фона для светлой темы */
      background-color: #ffffff;
    }
  }
`;

// Экспортируем глобальные стили для использования в приложении
export default GlobalStyle;
