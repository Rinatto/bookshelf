![Deploy to GitHub Pages](https://github.com/Rinatto/bookshelf/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

# Bookshelf

- Приложение для поиска книг.
- Используемое API: Google Books API.
- Адрес приложения: [Bookshelf на Netlify](https://main--bookshelfrinatto.netlify.app/)

## Обязательные требования

- [x] Реализованы требования к функциональности.
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем LocalStorage.
  - [AuthContext](src/components/AuthContext.tsx)
  - [Favorites](src/pages/Favorites.tsx)
  - [HistoryPage](src/pages/HistoryPage.tsx)
- [x] Пишем функциональные компоненты с хуками в приоритете над классовыми.
  - [Все компоненты](src/components)
- [x] Есть разделение на умные и глупые компоненты.
  - Умные компоненты: [AppRouter](src/components/AppRouter.tsx), [Favorites](src/pages/Favorites.tsx)
  - Глупые компоненты: [BookCard](src/components/BookCard.tsx), [MyButton](src/components/UI/MyButton/MyButton.tsx)
- [x] Есть рендеринг списков.
  - [Рендеринг книг](src/pages/About.tsx)
- [x] Реализована хотя бы одна форма.
  - [Форма входа](src/pages/SignIn.tsx)
  - [Форма регистрации](src/pages/Signup.tsx)
- [x] Есть применение Context API.
  - [AuthContext](src/components/AuthContext.tsx)
- [x] Есть применение предохранителя.
  - [ErrorBoundary](src/components/WithErrorBoundary.tsx)
- [x] Есть хотя бы один кастомный хук.
  - [useDebounce](src/hooks/useDebounce.ts)
- [x] Хотя бы несколько компонентов используют PropTypes.
  - [Пример компонента с PropTypes](src/components/BookCard.tsx)

## Необязательные требования

- [x] Использован TypeScript.
- [x] Настроен CI/CD.
  - [Настройки CI/CD](.github/workflows/deploy.yml)
