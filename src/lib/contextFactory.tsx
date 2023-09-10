import { Context, createContext, FC, useContext, useMemo, useState } from "react"
import { IProp, IStore } from "@/lib/types.ts"

function getCxtProvider<T = Record<string, any>>(
  key: string,
  defaultValue: T,
  AppContext: Context<IStore<T>>
) {
  return ({ children }: IProp) => {
    const [store, setStore] = useState(defaultValue)
    const value = useMemo(() => ({ key, store, setStore }), [store])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
  }
}

const ctxCache: Record<string, Ctx> = {}

class Ctx<T = any> {
  defaultStore: IStore<T>
  AppContext: Context<IStore<T>>
  Provider: ({ children }: IProp) => JSX.Element

  constructor(key: string, defaultValue: T) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {}
    }
    this.AppContext = createContext(this.defaultStore)
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext)
    ctxCache[key] = this
  }
}

export const useAppContext = (key: string) => {
  const ctx = ctxCache[key]
  const app = useContext(ctx.AppContext)

  return {
    store: app.store,
    setStore: app.setStore
  }
}

export const connectFactory = (key: string, defaultValue: Record<string, any>) => {
  let CurCtx: Ctx
  const ctx = ctxCache[key]

  if (ctx) {
    CurCtx = ctx
  } else {
    CurCtx = new Ctx(key, defaultValue)
  }

  return (Child: FC<any>) => (props: any) => (
    <CurCtx.Provider>
      <Child {...props} />
    </CurCtx.Provider>
  )
}
