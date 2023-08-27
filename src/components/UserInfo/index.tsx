import { FC } from "react"
import { connect, useGetUser } from "@/lib/userHooks.ts"
import { IProp } from "@/lib/types.ts"

const UserInfo: FC<IProp> = ({ children }) => {
  useGetUser()

  return <div className="h-screen">{children}</div>
}

export default connect(UserInfo)
