// theme.js

export const theme = {
  colors: {
    // Основные цвета приложения (Main application colors)
    background: '#242424', // Цвет фона приложения
    pageBackground: '#f0f2f5', // Цвет фона страниц
    text: 'rgba(255, 255, 255, 0.87)', // Основной цвет текста
    primaryText: '#181818', // Цвет основного текста
    secondaryText: '#999', // Цвет второстепенного текста
    priceText: '#4096ff', // Цвет текста цены
    bull: '#00d435', // Цвет для элементов "Бык"
    bear: '#ff0000', // Цвет для элементов "Медведь"
    hover: '#008cff', // Цвет при наведении курсора
    border: '#fff', // Цвет границ элементов
    borderColor: '#d1d1d1', // Цвет обводки элементов
    link: '#646cff', // Цвет ссылок
    linkHover: '#535bf2', // Цвет ссылок при наведении
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Цвет тени
    pulseShadow: 'rgba(64, 169, 255, 0.7)', // Цвет тени для пульсации

    // Цвета для контейнеров и фонов (Container and background colors)
    containerBackground: '#646464', // Цвет фона для контейнеров с иконками
    graphBackground: '#e9ecef', // Цвет фона графика
    iconBackground: '#4096ff', // Цвет фона иконок
    darkBackground: '#424242', // Темный фон для элементов
    lightBackground: '#f0f0f0', // Светлый фон при наведении

    // Цвета для иконок и оверлеев (Icons and overlay colors)
    circleIconColor: '#ffffff', // Цвет символа "+" в круге
    additionalIconBackground: '#d1d1d1', // Цвет фона дополнительной иконки
    overlayBackground: 'rgba(22, 119, 255, 0.7)', // Фон для оверлея заблокированных задач
    overlayTextColor: '#ffffff', // Цвет текста в оверлее
    starIconColor: '#ffffff', // Цвет иконки звезды в оверлее

    // Стили Header (Header styles)
    headerBackground: '#323232', // Фон хедера
    backButtonBackground: '#646464', // Фон кнопки назад
    backButtonHoverBackground: '#525252', // Фон кнопки назад при наведении
    avatarBackground: '#646464', // Фон аватара
    settingsBackground: '#646464', // Фон для настроек и аватара

    // Стили Footer (Footer styles)
    footerBackground: '#323232', // Цвет фона для подвала и кнопок
    footerHoverBackground: '#4a4a4a', // Цвет фона при наведении и активном состоянии
    footerTextColor: '#ffffff', // Цвет текста на кнопках подвала

    // Цвета индикаторов и прогресс-баров (Indicator and progress bar colors)
    indicatorBackground: '#424242', // Фон для индикаторов и прогресс-баров
    foodBarColor: '#ff9800', // Цвет прогресс-бара еды
    funBarColor: '#4caf50', // Цвет прогресс-бара веселья
    healthBarColor: '#f44336', // Цвет прогресс-бара здоровья
    levelProgressBarBackground: '#424242', // Цвет фона прогресс-бара уровня
    levelProgressBarFill: '#4096ff', // Цвет заполнения прогресс-бара уровня
    levelTextColor: '#424242', // Цвет текста и иконки в прогресс-баре уровня
    levelGradientStart: '#fef712', // Начальный цвет градиента в лейбле уровня
    levelGradientEnd: '#f67e0c', // Конечный цвет градиента в лейбле уровня

    // Цвета для кнопок магазина и фонов
    shopButtonBackground: '#646464', // Цвет фона для кнопок магазина
    shopButtonHoverBackground: '#4a4a4a', // Цвет фона при наведении и активном состоянии для кнопок магазина
    shopButtonTextColor: '#ffffff', // Цвет текста для кнопок магазина
    shopBackgroundColor: '#ffffff', // Цвет фона для страниц магазина

    // Цвета ActionButton
    actionButtonDisabledBackground: '#a0a0a0', // Цвет фона неактивной кнопки
    actionButtonBorderColor: '#4096ff', // Цвет обводки кнопки
  },
  fonts: {
    main: 'SF Pro Display, sans-serif', // Основной шрифт приложения
    sizes: {
      // Размеры шрифтов (Font sizes)
      extraSmall: '12px', // Очень маленький размер шрифта
      tiny: '0.6rem', // Очень маленький размер шрифта
      smaller: '0.7rem', // Немного меньше среднего
      small: '0.75rem', // Маленький размер шрифта
      medium: '1rem', // Средний размер шрифта
      large: '3.2em', // Большой размер шрифта для заголовков
      extraLarge: '40px', // Очень большой размер шрифта
      overlayLevel: '1.5rem', // Размер шрифта для уровня в оверлее
      overlayStar: '0.75rem', // Размер шрифта для звезды в оверлее
    },
  },
  breakpoints: {
    small: '480px', // Точка останова для маленьких экранов
    medium: '768px', // Точка останова для средних экранов
    large: '1200px', // Точка останова для больших экранов
  },
  sizes: {
    // Общие размеры и отступы (General sizes and spacings)
    marginSmall: '0.5rem', // Маленький отступ
    paddingSmall: '0.5rem', // Маленький внутренний отступ

    // Размеры иконок и контейнеров (Icon and container sizes)
    iconContainerWidth: '3rem', // Ширина контейнера иконки
    iconContainerHeight: '3rem', // Высота контейнера иконки
    iconWidth: '80%', // Ширина иконки внутри контейнера
    iconHeight: '80%', // Высота иконки внутри контейнера
    iconSize: '50px', // Размер иконки задачи
    iconSizeSmall: '15px', // Маленький размер иконки
    iconSizeMedium: '20px', // Средний размер иконки
    circleIconSize: '15px', // Размер круга для символа "+"
    anotherIconSize: '20px', // Размер дополнительной иконки
    iconMarginRight: '4px', // Отступ справа от иконки

    // Размеры прогресс-баров (Progress bar sizes)
    progressBarHeight: '15px', // Высота прогресс-бара
    progressBarBorderRadius: '5px', // Радиус скругления прогресс-бара
    levelProgressBarHeight: '20px', // Высота прогресс-бара уровня
    levelProgressPadding: '0.5rem 0', // Отступы для контейнера прогресс-бара уровня
    progressLabelPadding: '4px 8px', // Отступы для лейбла уровня

    // Размеры аватара и кнопок (Avatar and button sizes)
    avatarSize: '80px', // Размер аватара
    avatarSizeMobile: '60px', // Размер аватара на мобильных устройствах
    taskButtonWidth: '80px', // Ширина кнопки задачи
    taskButtonHeight: '35px', // Высота кнопки задачи
    taskButtonFontSize: '16px', // Размер шрифта кнопки задачи
    taskButtonHeightMobile: '40px', // Высота кнопки на мобильных устройствах
    taskButtonFontSizeMobile: '14px', // Размер шрифта кнопки на мобильных устройствах

    // Размеры для кнопок магазина
    shopButtonWidth: '15%', // Ширина кнопок магазина
    shopButtonBorderRadius: '25%', // Радиус скругления для кнопок магазина
    shopButtonMargin: '0.5rem', // Отступ для кнопок магазина

    // Размеры футера (Footer sizes)
    footerButtonWidth: '15%', // Ширина кнопки в подвале
    footerButtonBorderRadius: '25%', // Скругление углов кнопки в подвале
    footerPadding: '0.5rem 0', // Отступы для подвала
  },
  borderRadius: {
    small: '0.25rem', // Маленькое скругление углов
    medium: '0.5rem', // Среднее скругление углов
    large: '10px', // Большой радиус скругления
    card: '0.625rem', // Скругление углов для карточки задачи
    icon: '0.5rem', // Скругление углов для иконок
  },
  shadows: {
    main: '0 4px 12px rgba(0, 0, 0, 0.1)', // Основная тень для элементов
    cardShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)', // Тень для карточки задачи
  },
};
