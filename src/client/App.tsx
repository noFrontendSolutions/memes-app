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

//Notice the "hot" export of the App component. The "hot"-function is provided by the webpack "react-hot-loader plugin". It guarantees hot-module replacement in dev-mode throughout your app.

export default hot(App)
