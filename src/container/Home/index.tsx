import { FC } from "react"
import { connect, useUserContext } from "@/hooks/userHooks.ts"

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  const { store } = useUserContext()
  console.log(store)

  return <div>aaa</div>
}

export default connect(Home)
