import { ReactNode } from "react"

export interface IStore<T> {
  key: string
  store: T
  setStore: (payload: T) => void
}
export interface IProp {
  children: ReactNode
}

export interface IUser {
  id: string
  tel: string
  name: string
}
