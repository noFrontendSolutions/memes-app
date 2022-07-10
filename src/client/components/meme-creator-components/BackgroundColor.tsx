import { FabricJSEditor } from "fabricjs-react"
import React from "react"
type BackgroundColorType = "white" | "black" | "transparent"

const BackgroundColor = ({
  backgroundColor,
  setBackgroundColor,
  editor,
}: {
  backgroundColor: BackgroundColorType
  setBackgroundColor: React.Dispatch<React.SetStateAction<BackgroundColorType>>
  editor: FabricJSEditor
}) => {
  return (
    <>
      <button
        title="Background Color: Black"
        className={
          backgroundColor === "black"
            ? "m-2 w-10 h-10 bg-black rounded-full border-2 border-emerald-500"
            : "m-2 w-10 h-10 bg-black rounded-full"
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
            ? "m-2 w-10 h-10 bg-white rounded-full border-2 border-emerald-500"
            : "m-2 w-10 h-10 bg-white rounded-full"
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
            ? "m-2 w-10 h-10 bg-slate-800 rounded-full border-2 border-emerald-500"
            : "m-2 w-10 h-10 bg-slate-800 rounded-full"
        }
        onClick={() => {
          editor?.canvas.setBackgroundColor("Transparent", () => {})
          setBackgroundColor("transparent")
        }}
      ></button>
    </>
  )
}

export default BackgroundColor
