import {
  createContext,
  ReactChildren,
  ReactChild,
  useState,
  useEffect,
} from "react"

export const DynamicContext = createContext<DynamicState>({
  memeList: [],
  setMemeList: null,
  reload: false,
  setReload: null,
  isLoading: false,
  setIsLoading: null,
  error: null,
  setError: null,
})

const DynamicContextPrivder = ({
  children,
}: {
  children: ReactChild | ReactChildren
}) => {
  const [memeList, setMemeList] = useState<MemeInfo[]>([])
  const [refetch, setRefetch] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchMemeData = async () => {
    setIsLoading(true)
    let error: any = null
    let data: MemeInfo[] = []
    try {
      const response = await fetch(urls.memeInfo)
      data = await response.json()
      if (!response.ok) throw new Error("Ooops! Something went wrong!")
    } catch (error) {
      error = error
    } finally {
      setIsLoading(false)
    }
    return { data, error }
  }

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const { data, error } = await fetchMemeData()
      setMemeList(data)
      setError(error)
    })()
    return () => {
      isMounted = false
    }
  }, [refetch])

  return (
    <DynamicContext.Provider
      value={{
        memeList,
        setMemeList,
        reload: refetch,
        setReload: setRefetch,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DynamicContext.Provider>
  )
}

interface DynamicState {
  memeList: MemeInfo[]
  setMemeList: React.Dispatch<React.SetStateAction<MemeInfo[]>>
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  error: any
  setError: React.Dispatch<React.SetStateAction<any>>
}

interface MemeInfo {
  id: number
  title: string
  likes: number
  dislikes: number
  meme_url: string
  user_id: string
  user_name: string
}

export default DynamicContextPrivder

//Attention in case of changes: there of the urls object in the UserContext file too.

/* const urls = {
  login: "http://localhost:3000/auth/login",
  signUp: "http://localhost:3000/auth/sign-up",
  avatar: "http://localhost:3000/auth/avatars",
  defaultAvatar: "http://localhost:3000/auth/avatars/default-avatar",
  postMeme: "http://localhost:3000/users/post-meme",
  setPreferences: "http://localhost:3000/users/set-preferences", //with optional param if a user has already voted
  postComment: "http://localhost:3000/users/post-comment",
  memeInfo: "http://localhost:3000/public/meme-info",
  memeImage: "http://localhost:3000/public/meme-image",
  memeStats: "http://localhost:3000/public/meme-stats", // params meme_id as param
} */

const urls = {
  login: "https://46.101.193.133/api/auth/login",
  signUp: "https://46.101.193.133/api/auth/sign-up",
  avatar: "https://46.101.193.133/api/auth/avatars",
  defaultAvatar: "https://46.101.193.133/api/auth/avatars/default-avatar",
  postMeme: "https://46.101.193.133/api/users/post-meme",
  setPreferences: "https://46.101.193/api/users/set-preferences", //with optional param if a user has already voted
  postComment: "https://46.101.193.133/api/users/post-comment",
  memeInfo: "https://46.101.193.133/api/public/meme-info",
  memeImage: "https://46.101.193.133/api/public/meme-image",
  memeStats: "https://46.101.193.133/api/public/meme-stats", // params meme_id as param
}
