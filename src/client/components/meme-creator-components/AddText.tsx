import { FabricJSEditor } from "fabricjs-react"
import React from "react"

const AddText = ({
  text,
  setText,
  editor,
}: {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  editor: FabricJSEditor
}) => {
  return (
    <fieldset
      title="Text Editor"
      className="bg-slate-900 mb-2 w-2/3 rounded rounded-t-none"
    >
      {" "}
      <input
        className="rounded w-3/4 m-2 py-2 px-3 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-400"
        title={"Add Text here..."}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className="m-2 p-2 w-[20%] text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
        title="Add Text into Meme Container"
        onClick={() => {
          editor.addText(text)
          setText("")
        }}
      >
        Add Text
      </button>
    </fieldset>
  )
}

export default AddText
