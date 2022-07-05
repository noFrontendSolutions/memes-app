import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useState,
} from "react"

export const UserContext = createContext<UserContextState>({
  loginModalIsOpen: null,
  setLoginModalIsOpen: null,
})

const UserContextProvider = ({ children }: ChildrenProps) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)

  return (
    <UserContext.Provider value={{ loginModalIsOpen, setLoginModalIsOpen }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

interface ChildrenProps {
  children: ReactChild | ReactChildren
}

interface UserContextState {
  loginModalIsOpen: boolean | null
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null
}
