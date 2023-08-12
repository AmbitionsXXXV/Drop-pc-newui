import { FC, ReactElement } from "react"
import { ModeToggle } from "@/components/mode-toggle"

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <>
      <div className="h-10 w-screen flex items-center justify-end">
        <ModeToggle />
      </div>
      {children}
    </>
  )
}

export default Layout
