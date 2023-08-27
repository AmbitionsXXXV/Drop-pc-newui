import { connectFactory, useAppContext } from "@/lib/contextFactory.tsx"
import { useQuery } from "@apollo/client"
import { GET_USER_INFO } from "@/graphql/user.ts"
import { IUser } from "@/lib/types.ts"

const KEY = "userInfo"
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY)

export const connect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { setStore } = useUserContext()

  useQuery<{ getUserInfo: IUser }>(GET_USER_INFO, {
    onCompleted: data => {
      if (data.getUserInfo) {
        const { id, tel, name } = data.getUserInfo
        setStore({ id, tel, name })

        return
      }

      window.location.href = "/login"
    },
    onError: () => {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
  })
}
