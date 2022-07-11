import React, { useState } from "react"
import { fabric } from "fabric"
import { FabricJSEditor } from "fabricjs-react"
type TextColorType = "white" | "black" | "green" | "red" | "yellow" | "blue"

const SelectSpecialFeature = ({
  textColor,
  editor,
}: {
  textColor: TextColorType
  editor: FabricJSEditor
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      {modalIsOpen && (
        <>
          <div
            onClick={() => setModalIsOpen(!modalIsOpen)}
            className="fixed z-20 inset-x-0 inset-y-0 h-screen w-screen opacity-25 bg-slate-300"
          ></div>
          <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-1/2 xl:w-1/4 bg-slate-800 text-slate-400">
            <button
              className="w-[97%] flex flex-row justify-center items-center m-2 p-2 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
              onClick={() => {
                setModalIsOpen(false)
                drawArrow(textColor, editor)
              }}
            >
              Create Arrow
              <span className="ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
            <div className="flex flex-row justify-center items-center m-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300">
              Coming soon...
            </div>
            <div className="flex flex-row justify-center items-center m-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300">
              Coming soon...
            </div>
            <div className="flex flex-row justify-center items-center m-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300">
              Coming soon...
            </div>
            <div className="flex flex-row justify-center items-center m-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300">
              Coming soon...
            </div>
            <div className="flex flex-row justify-center items-center m-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300">
              Coming soon...
            </div>
          </div>
        </>
      )}

      <button
        id="special-feature"
        title="Choose a Special Feature..."
        onClick={() => setModalIsOpen(!modalIsOpen)}
        className="w-full lg:ml-14 cursor-pointer flex flex-row justify-center items-center m-2 p-2 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
      >
        {" "}
        Select Special Feature
        <span className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-6 w-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </span>
      </button>
    </>
  )
}

export default SelectSpecialFeature

const drawArrow = (textColor: TextColorType, editor: FabricJSEditor) => {
  const triangle = new fabric.Triangle({
    width: 10,
    height: 15,
    fill: textColor,
    left: 235,
    top: 65,
    angle: 90,
  })

  const line = new fabric.Line([50, 100, 200, 100], {
    left: 75,
    top: 70,
    stroke: textColor,
  })

  const objs = [line, triangle]

  const arrow = new fabric.Group(objs)
  editor.canvas.add(arrow)
}
