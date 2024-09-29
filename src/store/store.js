// src/store/store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Импортируем из './reducers/index.js'

const store = createStore(
  rootReducer,
  // Подключение Redux DevTools Extension для удобной отладки
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
