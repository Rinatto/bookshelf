import type { Middleware } from "@reduxjs/toolkit"

import { storageService } from "../services/storageService"

export const loggerMiddleware: Middleware<{}, any> =
  store => next => action => {
    const result = next(action)

    let logs = storageService.getLogs()
    logs.push({
      action,
      state: store.getState(),
    })

    if (logs.length > 100) {
      logs.shift()
    }

    storageService.saveLogs(logs)

    return result
  }
