import { FabricJSEditor } from "fabricjs-react"
import React from "react"
type TextColorType = "white" | "black" | "green" | "red" | "yellow" | "blue"

const SelectTextColor = ({
  textColor,
  setTextColor,
  editor,
}: {
  textColor: TextColorType
  setTextColor: React.Dispatch<React.SetStateAction<TextColorType>>
  editor: FabricJSEditor
}) => {
  return (
    <>
      <fieldset
        id="text-color"
        title="Chose Text Color"
        className="ml-2 flex flex-row items-center w-24 bg-slate-900 rounded rounded-b-none h-14"
      >
        <button
          title="Text Color: Black"
          className={
            textColor === "black"
              ? "m-2 w-8 h-8 bg-black rounded-full border-2 border-emerald-500"
              : "m-2 w-8 h-8 bg-black rounded-full"
          }
          onClick={() => {
            editor?.setStrokeColor("black")
            setTextColor("black")
          }}
        ></button>
        <button
          title="Text Color: Red"
          className={
            textColor === "red"
              ? "m-2 w-8 h-8 bg-red-600 rounded-full border-2 border-emerald-500"
              : "m-2 w-8 h-8 bg-red-600 rounded-full"
          }
          onClick={() => {
            editor?.setStrokeColor("red")
            setTextColor("red")
          }}
        ></button>
        <button
          title="Text Color: Blue"
          className={
            textColor === "blue"
              ? "m-2 w-8 h-8 bg-blue-600 rounded-full border-2 border-emerald-500"
              : "m-2 w-8 h-8 bg-blue-600 rounded-full"
          }
          onClick={() => {
            editor?.setStrokeColor("blue")
            setTextColor("blue")
          }}
        ></button>
        <button
          title="Text Color: Green"
          className={
            textColor === "green"
              ? "m-2 w-8 h-8 bg-green-600 rounded-full border-2 border-emerald-500"
              : "m-2 w-8 h-8 bg-green-600 rounded-full"
          }
          onClick={() => {
            editor?.setStrokeColor("green")
            setTextColor("green")
          }}
        ></button>
        <button
          title="Text Color: Yellow"
          className={
            textColor === "yellow"
              ? "m-2 w-8 h-8 bg-yellow-600 rounded-full border-2 border-emerald-500"
              : "m-2 w-8 h-8 bg-yellow-600 rounded-full"
          }
          onClick={() => {
            editor?.setStrokeColor("yellow")
            setTextColor("yellow")
          }}
        ></button>
        <button
          title="Text Color: White"
          className={
            textColor === "white"
              ? "m-2 w-8 h-8 bg-white rounded-full border-2 border-emerald-500"
              : "m-2 w-8 h-8 bg-white rounded-full"
          }
          onClick={() => {
            editor?.setStrokeColor("white")
            setTextColor("white")
          }}
        ></button>
      </fieldset>
    </>
  )
}

export default SelectTextColor
