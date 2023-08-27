import { FieldValues, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation } from "@apollo/client"
import { LOGIN } from "@/graphql/auth.ts"
import { SUCCESS } from "@/constants/code.ts"
import { AUTH_TOKEN } from "@/constants"
import { useNavigate, useSearchParams } from "react-router-dom"

export const useOnSubmit = <T extends FieldValues>(form: any): SubmitHandler<T> => {
  const [login] = useMutation(LOGIN)
  const navigate = useNavigate()
  const [params] = useSearchParams()

  return async data => {
    await form.trigger()

    // 登录逻辑处理
    const response = await login({
      variables: data
    })
    console.log("data>>", data)
    if (response.data.login.code === SUCCESS) {
      if (data.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, "")
        localStorage.setItem(AUTH_TOKEN, response.data.login.data)
      } else {
        localStorage.setItem(AUTH_TOKEN, "")
        sessionStorage.setItem(AUTH_TOKEN, response.data.login.data)
      }

      toast.success("登录成功", {
        style: {
          color: "var(--foreground)",
          background: "--background",
          borderColor: "var(--border)"
        }
      })

      navigate(params.get("orgUrl") || "")

      return
    }

    toast.error(response.data.login.message, {
      style: {
        color: "var(--foreground)",
        background: "var(--background)",
        borderColor: "var(--border)"
      }
    })
  }
}
