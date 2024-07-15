import type { Middleware } from "@reduxjs/toolkit"

export const loggerMiddleware: Middleware<{}, any> =
  store => next => action => {
    const result = next(action)

    const logs = JSON.parse(localStorage.getItem("redux-logs") || "[]")
    logs.push({
      action,
      state: store.getState(),
    })
    localStorage.setItem("redux-logs", JSON.stringify(logs))

    return result
  }
