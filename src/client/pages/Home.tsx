import React, { useContext, useState } from "react"
import Container from "../components/meme-modal/Container"
import MemePreview from "../components/MemePreview"
import { ModalContext } from "../context/ModalContext"
import { DynamicContext } from "../context/DynamicState"

function Home() {
  const { showMemeDetailsComponent, setShowMemeDetailsComponent } =
    useContext(ModalContext)
  const { isLoading, memeList } = useContext(DynamicContext)

  const [chosenMemeId, setChosenMemeId] = useState<number | null>(null)

  const [memeStats, setMemeStats] = useState(null)

  return (
    <div className="min-h-screen font-titillium bg-black flex flex-col lg:grid lg:grid-cols-2  2xl:grid-cols-3 gap-20 sm:p-4">
      {showMemeDetailsComponent && (
        <>
          <div
            onClick={() => {
              setChosenMemeId(null)
              setShowMemeDetailsComponent(false)
            }}
            className="fixed z-20 inset-0 h-screen w-screen opacity-25 bg-slate-400 font-titillium"
          ></div>
          <Container
            id={chosenMemeId}
            memeStats={memeStats}
            setShowMemeDetailsComponent={setShowMemeDetailsComponent}
            setMemeStats={setMemeStats}
          />
        </>
      )}
      {memeList.length > 0 ? (
        memeList?.map((memeInfo) => {
          return (
            <MemePreview
              key={memeInfo.id}
              id={memeInfo.id}
              setShowMemeDetailsPage={setShowMemeDetailsComponent}
              setChosenMemeId={setChosenMemeId}
              setMemeStats={setMemeStats}
              memeInfo={memeInfo}
            />
          )
        })
      ) : (
        <div className="fixed h-full w-full flex justify-center items-center">
          <p className="text-red-400">Oopps! Something went wrong...</p>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-24 h-24 text-emerald-300 animate-spin  fill-emerald-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default Home
