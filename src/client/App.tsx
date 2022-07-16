import { hot } from "react-hot-loader/root"
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import UserContextProvider from "./context/UserContext"
import MemeCreator from "./pages/MemeCreator"
import PostMeme from "./pages/PostMeme"

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="meme-creator" element={<MemeCreator />} />
            <Route path="post-meme" element={<PostMeme />} />
          </Routes>
        </NavBar>
      </BrowserRouter>
    </UserContextProvider>
  )
}

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-0 bg-opacity-0">
      <div className="z-10 h-36 w-36 border-4 border-reactBlue border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

//Notice the "hot" export of the App component. The "hot"-function is provided by the webpack "react-hot-loader plugin". It guarantees hot-module replacement in dev-mode throughout your app.

export default hot(App)
