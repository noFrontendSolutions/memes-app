import { FabricJSEditor } from "fabricjs-react"
import React from "react"

const RemoveActiveObject = ({ editor }: { editor: FabricJSEditor }) => {
  return (
    <>
      {" "}
      <label
        htmlFor="download-meme"
        className="cursor-pointer flex flex-row justify-center items-center m-2 p-2 text-red-400 border border-red-400 rounded hover:text-red-300 hover:border-red-300"
      >
        <button
          id="download-meme"
          title="Choose Background Image..."
          onClick={() => editor.canvas.remove(editor.canvas.getActiveObject())}
          className="flex justify-center items-center"
        >
          {" "}
          Remove Active Element
          <span>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </span>
        </button>
      </label>
    </>
  )
}

export default RemoveActiveObject
