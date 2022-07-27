import { FabricJSEditor } from "fabricjs-react"
import React from "react"
import { fabric } from "fabric"

const AddImage = ({ editor }: { editor: FabricJSEditor }) => {
  return (
    <div className="rounded">
      <label
        htmlFor="image"
        className="cursor-pointer mt-2 flex flex-row justify-center items-center m-2 p-2 w-52 text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
      >
        Add Image
        <input
          id="image"
          title="Choose Image..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onAddImage(e, editor)
          }}
          type="file"
          className="hidden"
        />
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-8 w-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </span>
      </label>
    </div>
  )
}

const onAddImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  editor: FabricJSEditor
) => {
  const imageFile = e.target.files[0]

  fabric.Image.fromURL(URL.createObjectURL(imageFile), (img) => {
    img.scale(0.5)
    editor.canvas.add(img)
    editor.canvas.centerObject(img)
    editor.canvas.renderAll()
  })
}

export default AddImage
