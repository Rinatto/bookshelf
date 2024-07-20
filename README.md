![Deploy to GitHub Pages](https://github.com/Rinatto/bookshelf/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

# Bookshelf

- Приложение для поиска книг.
- Используемое API: Google Books API.
- Адрес приложения: [Bookshelf на Netlify](https://main--bookshelfrinatto.netlify.app/)

# Обязательные требования

- [x] Реализованы требования к функциональности.
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем LocalStorage.
  - [AuthContext](src/components/AuthContext.tsx)
  - [Favorites](src/pages/Favorites.tsx)
  - [HistoryPage](src/pages/HistoryPage.tsx)

## React

- [x] Пишем функциональные компоненты с хуками в приоритете над классовыми.
  - [Все компоненты](src/components)
- [x] Есть разделение на умные и глупые компоненты.
  - Умные компоненты: [AppRouter](src/components/AppRouter.tsx), [Favorites](src/pages/Favorites.tsx)
  - Глупые компоненты: [BookCard](src/components/BookCard.tsx), [MyButton](src/components/UI/MyButton/MyButton.tsx)
- [x] Есть рендеринг списков.
  - [Рендеринг книг](src/pages/About.tsx)
- [x] Реализована хотя бы одна форма.
  - [Форма входа](src/pages/SignIn.tsx)
  - [Форма регистрации](src/pages/SignUp.tsx)
- [x] Есть применение Context API.
  - [ThemeContext](src/components/ThemeContext.tsx)
- [x] Есть применение предохранителя.
  - [ErrorBoundary](src/components/WithErrorBoundary.tsx)
- [x] Есть хотя бы один кастомный хук.
  - [useFetch](src/hooks/useFetch.ts)
- [x] Хотя бы несколько компонентов используют PropTypes.
  - [Пример компонента MyButton с PropTypes](src/components/UI/MyButton/MyButton.tsx)
  - [Пример компонента MyInput с PropTypes](src/components/UI/Input/MyInput.tsx)
- [x] Поиск не должен триггерить много запросов к серверу.
  - [useDebounce](src/hooks/useDebounce.ts)
- [x] Есть применение lazy + Suspense.
  - [lazy](src/router/index.ts)
  - [Suspense](src/components/AppRouter.tsx)

## Reduce

- [x] Используем Modern Redux with Redux Toolkit.
  - [Modern Redux with Redux Toolkit](src/app/store.ts)
- [x] Используем слайсы.
  - [слайсы](src/features/books/booksSlice.ts)
- [x] Есть хотя бы одна кастомная мидлвара.
  - [кастомная мидлвара](src/middleware/loggerMiddleware.ts)
- [x] Используется RTK Query.
  - [RTK Query](src/features/books/booksApi.ts)
- [x] Используется Transforming Responses.
  - [Transforming Responses](src/features/books/booksApi.ts#L26)

# Необязательные требования

- [x] Использован TypeScript.
- [x] Низкая связанность клиентского кода с хранилищем.
  - [storageService](src/services/index.ts)
  - Клиентский код приложения не завязан жестко на конкретное хранилище данных. В данном приложении используется `storageService`, который может быть переключен между LocalStorage и Firebase с использованием переменной окружения `REACT_APP_REMOTE_STORE`. Это позволяет легко заменить одно хранилище на другое без изменений в клиентском коде.
- [x] Настроен CI/CD.
  - [Настройки CI/CD](.github/workflows/deploy.yml)
