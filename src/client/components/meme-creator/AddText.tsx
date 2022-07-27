import { fabric } from "fabric"
import { FabricJSEditor } from "fabricjs-react"
import React from "react"
type TextColorType = "white" | "black" | "green" | "red" | "yellow" | "blue"

const AddText = ({
  text,
  setText,
  textColor,
  editor,
}: {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  textColor: TextColorType
  editor: FabricJSEditor
}) => {
  return (
    <fieldset
      title="Text Editor"
      className="bg-slate-900 lg:w-2/3 w-full rounded rounded-t-none flex flex-row"
    >
      {" "}
      <input
        className="rounded w-3/4 m-2 py-2 px-3 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-400"
        title={"Add Text here..."}
        placeholder="Add Text here..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className="m-2 p-2 lg:w-[20%] text-emerald-400 border border-emerald-400 rounded hover:text-emerald-300 hover:border-emerald-300"
        title="Add Text into Meme Container"
        onClick={() => {
          let thisText = new fabric.Text(text, {
            fontSize: 35,
            fill: textColor,
          })
          editor?.canvas.add(thisText)
          setText("")
        }}
      >
        Add Text
      </button>
    </fieldset>
  )
}

export default AddText
