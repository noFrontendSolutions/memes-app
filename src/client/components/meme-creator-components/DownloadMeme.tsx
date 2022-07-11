import { FabricJSEditor } from "fabricjs-react"
import React from "react"

const DownloadMeme = ({ editor }: { editor: FabricJSEditor }) => {
  return (
    <>
      <button
        id="download-meme"
        title="Download your meme..."
        onClick={() => onDownloadImage(editor)}
        className="cursor-pointer flex flex-row justify-center items-center m-2 p-2 text-blue-400 border border-blue-400 rounded hover:text-blue-300 hover:border-blue-300"
      >
        {" "}
        Download Meme
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </span>
      </button>
    </>
  )
}

const onDownloadImage = (editor: FabricJSEditor) => {
  const ext = "png"
  const base64 = editor.canvas.toDataURL({
    format: ext,
    enableRetinaScaling: true,
  })
  const link = document.createElement("a")
  link.href = base64
  link.download = `eraser_example.${ext}`
  link.click()
}

export default DownloadMeme
