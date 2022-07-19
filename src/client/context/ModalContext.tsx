import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useState,
} from "react"

export const ModalContext = createContext<ModalState>({
  loginModalIsOpen: false,
  setLoginModalIsOpen: null,
  userModalIsOpen: false,
  setUserModalIsOpen: null,
  memeModalIsOpen: false,
  setMemeModalIsOpen: null,
  postMemeModalIsOpen: false,
  setPostMemeModalIsOpen: null,
})

export const ModalContextProvider = ({
  children,
}: {
  children: ReactChild | ReactChildren
}) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [userModalIsOpen, setUserModalIsOpen] = useState(false)
  const [postMemeModalIsOpen, setPostMemeModalIsOpen] = useState(false)
  const [memeModalIsOpen, setMemeModalIsOpen] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        loginModalIsOpen,
        setLoginModalIsOpen,
        userModalIsOpen,
        setUserModalIsOpen,
        memeModalIsOpen,
        setMemeModalIsOpen,
        postMemeModalIsOpen,
        setPostMemeModalIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

interface ModalState {
  loginModalIsOpen: boolean
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  userModalIsOpen: boolean
  setUserModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  memeModalIsOpen: boolean
  setMemeModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  postMemeModalIsOpen: boolean
  setPostMemeModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
