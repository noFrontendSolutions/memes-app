import { FabricJSEditor } from "fabricjs-react"
import React from "react"
type BackgroundColorType = "white" | "black" | "transparent"

const SelectBackgroundColor = ({
  backgroundColor,
  setBackgroundColor,
  editor,
}: {
  backgroundColor: BackgroundColorType
  setBackgroundColor: React.Dispatch<React.SetStateAction<BackgroundColorType>>
  editor: FabricJSEditor
}) => {
  return (
    <fieldset
      title="Chose Background Color"
      className="flex justify-center items-center bg-slate-900 mt-2 mb-2 rounded"
    >
      <button
        title="Background Color: Black"
        className={
          backgroundColor === "black"
            ? "m-2 w-8 h-8 bg-black rounded-full border-2 border-emerald-500"
            : "m-2 w-8 h-8 bg-black rounded-full"
        }
        onClick={() => {
          editor?.canvas.setBackgroundColor("black", () => {})
          setBackgroundColor("black")
        }}
      ></button>
      <button
        title="Background Color: White"
        className={
          backgroundColor === "white"
            ? "m-2 w-8 h-8 bg-white rounded-full border-2 border-emerald-500"
            : "m-2 w-8 h-8 bg-white rounded-full"
        }
        onClick={() => {
          editor?.canvas.setBackgroundColor("white", () => {})
          setBackgroundColor("white")
        }}
      ></button>
      <button
        title="Background Color: Transparent"
        className={
          backgroundColor === "transparent"
            ? "m-2 w-8 h-8 bg-slate-800 rounded-full border-2 border-emerald-500"
            : "m-2 w-8 h-8 bg-slate-800 rounded-full"
        }
        onClick={() => {
          editor?.canvas.setBackgroundColor("Transparent", () => {})
          setBackgroundColor("transparent")
        }}
      ></button>
    </fieldset>
  )
}

export default SelectBackgroundColor
