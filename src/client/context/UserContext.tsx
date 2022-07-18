import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
  useState,
} from "react"

const urls = {
  login: "http://localhost:3000/auth/login",
  signUp: "http://localhost:3000/auth/sign-up",
  avatar: "http://localhost:3000/auth/avatars",
  postMeme: "http://localhost:3000/users/post-meme",
  postComment: "http://localhost:3000/users/post-comment",
  memeInfo: "http://localhost:3000/public/meme-info",
  memeImage: "http://localhost:3000/public/meme-image",
}

export const UserContext = createContext<UserContextState>({
  loggedIn: false,
  bearerToken: "",
  setBearerToken: null,
  setLoggedIn: null,
  loginModalIsOpen: false,
  setLoginModalIsOpen: null,
  userModalIsOpen: false,
  setUserModalIsOpen: null,
  postMemeModalIsOpen: false,
  setPostMemeModalIsOpen: null,
  credentials: null,
  setCredentials: null,
  isLoading: false,
  setIsLoading: null,
  error: null,
  setError: null,
  urls: urls,
})

const UserContextProvider = ({ children }: ChildrenProps) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [bearerToken, setBearerToken] = useState("")
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [userModalIsOpen, setUserModalIsOpen] = useState(false)
  const [postMemeModalIsOpen, setPostMemeModalIsOpen] = useState(false)
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (localStorage.getItem("bearerToken")) {
      setBearerToken(localStorage.getItem("bearerToken"))

      setCredentials({
        ...credentials,
        id: localStorage.getItem("id"),
        first_name: localStorage.getItem("first_name"),
        last_name: localStorage.getItem("last_name"),
        email: localStorage.getItem("email"),
        avatar_url: localStorage.getItem("avatar_url"),
      })

      setLoggedIn(true)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        bearerToken,
        setBearerToken,
        setLoggedIn,
        loginModalIsOpen,
        setLoginModalIsOpen,
        userModalIsOpen,
        setUserModalIsOpen,
        postMemeModalIsOpen,
        setPostMemeModalIsOpen,
        credentials,
        setCredentials,
        isLoading,
        setIsLoading,
        error,
        setError,
        urls,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

interface ChildrenProps {
  children: ReactChild | ReactChildren
}

interface UserContextState {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null
  loginModalIsOpen: boolean | null
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null
  userModalIsOpen: boolean | null
  setUserModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null
  postMemeModalIsOpen: boolean | null
  setPostMemeModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>> | null
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null
  error: any
  setError: React.Dispatch<React.SetStateAction<any>> | null
  bearerToken: string | null
  setBearerToken: React.Dispatch<React.SetStateAction<string>> | null
  urls: {
    login: string
    signUp: string
    avatar: string
    postMeme: string
    postComment: string
    memeInfo: string
    memeImage: string
  }
}

interface Credentials {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  avatar_url?: string
  avatar?: File | null
}
