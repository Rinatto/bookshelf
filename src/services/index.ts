import { firebaseStorageService } from "./firebaseStorageService"
import { localStorageService } from "./localStorageService"

const isFirebase = import.meta.env.VITE_REMOTE_STORE === "firebase"

export const storageService = isFirebase
  ? firebaseStorageService
  : localStorageService
