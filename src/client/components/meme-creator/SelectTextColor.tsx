import { FabricJSEditor } from "fabricjs-react"
import React from "react"
type TextColorType = "white" | "black" | "green" | "red" | "yellow" | "blue"

const SelectTextColor = ({
  textColor,
  setTextColor,
  fillColor,
  setFillColor,
  editor,
}: {
  textColor: TextColorType
  setTextColor: React.Dispatch<React.SetStateAction<TextColorType>>
  fillColor: TextColorType
  setFillColor: React.Dispatch<React.SetStateAction<TextColorType>>
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
            editor?.setFillColor("black")
            setTextColor("black")
            setFillColor("black")
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
            editor?.setFillColor("red")
            setTextColor("red")
            setFillColor("red")
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
            editor?.setFillColor("blue")
            setTextColor("blue")
            setFillColor("blue")
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
            editor?.setFillColor("green")
            setTextColor("green")
            setFillColor("green")
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
            editor?.setFillColor("yellow")
            setTextColor("yellow")
            setFillColor("yellow")
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
            editor?.setFillColor("white")
            setTextColor("white")
            setFillColor("white")
          }}
        ></button>
      </fieldset>
    </>
  )
}

export default SelectTextColor
