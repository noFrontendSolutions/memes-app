import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useEffect,
  useState,
} from "react"

//Attention in case of changes: there of the urls object in the DynamicContext file too.
const urls = {
  login: "http://localhost:3000/auth/login",
  signUp: "http://localhost:3000/auth/sign-up",
  avatar: "http://localhost:3000/auth/avatars",
  postMeme: "http://localhost:3000/users/post-meme",
  postComment: "http://localhost:3000/users/post-comment",
  memeInfo: "http://localhost:3000/public/meme-info",
  memeImage: "http://localhost:3000/public/meme-image",
  memeStats: "http://localhost:3000/public/meme-stats", // params meme_id as param
}

export const UserContext = createContext<UserContextState>({
  loggedIn: false,
  bearerToken: "",
  setBearerToken: null,
  setLoggedIn: null,
  credentials: null,
  setCredentials: null,
  error: null,
  setError: null,
  urls: urls,
})

const UserContextProvider = ({
  children,
}: {
  children: ReactChild | ReactChildren
}) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [bearerToken, setBearerToken] = useState("")
  const [credentials, setCredentials] = useState<Credentials | null>(null)
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
        credentials,
        setCredentials,
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

interface UserContextState {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>> | null
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
    memeStats: string
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
