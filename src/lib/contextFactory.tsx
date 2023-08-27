import { Context, createContext, FC, useContext, useMemo, useState } from "react"
import { IProp, IStore } from "@/lib/types.ts"

const getCxtProvider =
  (key: string, defaultValue: Record<string, any>, AppContext: Context<IStore>) =>
  ({ children }: IProp) => {
    const [store, setStore] = useState(defaultValue)
    const value = useMemo(() => ({ key, store, setStore }), [store])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
  }

const ctxCache: Record<string, Ctx> = {}

class Ctx {
  defaultStore: IStore
  AppContext: Context<IStore>
  Provider: ({ children }: IProp) => JSX.Element

  constructor(key: string, defaultValue: Record<string, any>) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {}
    }

    this.AppContext = createContext(this.defaultStore)

    this.Provider = getCxtProvider(key, this.defaultStore, this.AppContext)

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
