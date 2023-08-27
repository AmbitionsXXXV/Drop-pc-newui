import { Dispatch, ReactNode, SetStateAction } from "react"

export interface IStore {
  key: string
  store: Record<string, any>
  setStore: Dispatch<SetStateAction<Record<string, any>>>
}

export interface IProp {
  children: ReactNode
}

export interface IUser {
  id: string
  tel: string
  name: string
}
