// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {}, // Пустой объект, редюсеры будут добавлены позже
})

// Экспорт типов корневого состояния и диспетчера для использования в типизированных хуках
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
