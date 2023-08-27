import { FC } from "react"
import { connect, useGetUser } from "@/hooks/userHooks.ts"
import { IProp } from "@/lib/types.ts"
import { Spinner } from "@nextui-org/spinner"

const UserInfo: FC<IProp> = ({ children }) => {
  const { loading } = useGetUser()

  return (
    <>
      {loading ? (
        <Spinner
          size="lg"
          color="primary"
          className="h-screen w-screen flex items-center justify-center"
        />
      ) : (
        <div className="h-screen">{children}</div>
      )}
    </>
  )
}

export default connect(UserInfo)
