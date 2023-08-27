import { connectFactory, useAppContext } from "@/lib/contextFactory.tsx"
import { useQuery } from "@apollo/client"
import { GET_USER_INFO } from "@/graphql/user.ts"
import { IUser } from "@/lib/types.ts"
import { useLocation, useNavigate } from "react-router-dom"

const KEY = "userInfo"
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY)

export const connect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { setStore } = useUserContext()
  const location = useLocation()
  const navigate = useNavigate()

  const { loading } = useQuery<{ getUserInfo: IUser }>(GET_USER_INFO, {
    onCompleted: data => {
      if (data.getUserInfo) {
        const { id, tel, name } = data.getUserInfo
        setStore({ id, tel, name })

        if (location.pathname.startsWith("/login")) {
          navigate("/")
        }

        return
      }

      if (location.pathname !== "/login") {
        navigate(`/login?orgUrl=${location.pathname}`)
      }
    },
    onError: () => {
      if (location.pathname !== "/login") {
        navigate(`/login?orgUrl=${location.pathname}`)
      }
    }
  })

  return { loading }
}
