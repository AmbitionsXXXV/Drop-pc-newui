import { FieldValues, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation } from "@apollo/client"
import { LOGIN } from "@/graphql/auth.ts"

export const useOnSubmit = <T extends FieldValues>(form: any): SubmitHandler<T> => {
  const [login] = useMutation(LOGIN)

  return async data => {
    await form.trigger()

    // 登录逻辑处理
    const response = await login({ variables: data })
    if (response.data?.login) {
      toast.success("登录成功")
    } else {
      toast.error("登录失败")
    }
  }
}
