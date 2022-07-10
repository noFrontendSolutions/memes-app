import React, { useState, useRef, useEffect } from "react"
import { fabric } from "fabric" // this also installed on your project
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react"

import ObjectFit from "../components/meme-creator-components/ObjectFit"

type BackgroundColor = "white" | "black" | "transparent"
type ObjectType = "none" | "fill" | "contain" | "cover" | "scale-down"

//***********Main Component********************************

const MemeCreator = () => {
  const { editor, onReady } = useFabricJSEditor()
  const [text, setText] = useState("")
  const [objectType, setObjectType] = useState<ObjectType>("none")
  const [backroundColor, setBackgroundColor] =
    useState<BackgroundColor>("transparent")
  const [backgroundUrl, setBackgroundUrl] = useState("")
  const [backgroundFile, setBackgroundFile] = useState<File>(null)

  const onDownloadImage = () => {
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

  const onAddText = () => {
    editor.addText(text)
    setText("")
  }

  useEffect(() => {
    if (backgroundUrl) {
      onSetObjectFit(backgroundFile, editor, objectType)
    }
  }, [backgroundUrl, objectType])

  useEffect(() => {
    let screenWidth = window.screen.width
    let screenHeight = window.screen.height
    if (screenWidth < 1000) {
      editor?.canvas.setDimensions({
        width: screenWidth / 1.3,
        height: screenHeight / 1.8,
      })
    } else {
      editor?.canvas.setDimensions({
        width: screenWidth / 2,
        height: screenHeight / 1.8,
      })
    }
  }, [editor])

  return (
    <div className="h-screen bg-slate-700 flex flex-col justify-start items-center">
      <div className="font-titillium bg-slate-700 text-slate-400 flex justify-center items-center">
        <h1>FabricJS React Sample</h1>
        <fieldset className="border-2 p-2">
          <input
            className="border m-2"
            name={`text`}
            type={`text`}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button className="border-2 m-2 p-2" onClick={onAddText}>
            Add Text
          </button>

          <button onClick={onDownloadImage} className="border-2 m-2 p-2">
            Export
          </button>
          <label htmlFor="file-upload" className="cursor-pointer border-2">
            Upload File
            <input
              id="file-upload"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onAddBackground(e, setBackgroundUrl, setBackgroundFile)
              }
              type="file"
              className="hidden"
            />
          </label>
        </fieldset>
        <label htmlFor="canvas-layout"></label>
        <label htmlFor="ratio-layout"></label>
        <ObjectFit objectType={objectType} setObjectType={setObjectType} />
      </div>
      <div className="mt-10 flex flex-col items-end">
        <fieldset
          title="Choose Background Color"
          className="flex flex-row border border-emerald-500 border-b-0 w-24 bg-slate-900"
        >
          <button
            title="Background Color: Black"
            className={
              backroundColor === "black"
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
              backroundColor === "white"
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
              backroundColor === "transparent"
                ? "m-2 w-10 h-10 bg-slate-800 rounded-full border-2 border-emerald-500"
                : "m-2 w-10 h-10 bg-slate-800 rounded-full"
            }
            onClick={() => {
              editor?.canvas.setBackgroundColor("Transparent", () => {})
              setBackgroundColor("transparent")
            }}
          ></button>
        </fieldset>
        <div className={"border border-emerald-500"}>
          <FabricJSCanvas
            onReady={onReady}
            className={
              backroundColor === "black"
                ? "h-full bg-black"
                : backroundColor === "white"
                ? "h-full bg-white"
                : "h-full bg-slate-800"
            }
          />
        </div>
      </div>
    </div>
  )
}

export default MemeCreator

/******************************************
 *****************Functions*****************
 *******************************************/

export const onAddBackground = (
  e: React.ChangeEvent<HTMLInputElement>,
  setBackground: React.Dispatch<React.SetStateAction<string>>,
  setBackgroundFile: React.Dispatch<React.SetStateAction<File>>
) => {
  const imageFile = e.target.files[0]
  setBackground(URL.createObjectURL(imageFile))
  setBackgroundFile(imageFile)
}

const onSetObjectFit = (
  backgroundFile: File,
  editor: FabricJSEditor,
  objectType: ObjectType
) => {
  fabric.Image.fromURL(URL.createObjectURL(backgroundFile), (img) => {
    const widthRatio = editor.canvas.width / img.width
    const heightRatio = editor.canvas.width / img.height
    const minRatio = Math.min(widthRatio, heightRatio)
    const maxRatio = Math.max(widthRatio, heightRatio)
    const scaleDownRatio = Math.min(1, widthRatio, heightRatio)
    if (objectType === "contain") {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: minRatio,
          scaleY: minRatio,
        }
      )
    } else if (objectType === "fill") {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: editor.canvas.width / img.width,
          scaleY: editor.canvas.height / img.height,
        }
      )
    } else if (objectType === "cover") {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: maxRatio,
          scaleY: maxRatio,
        }
      )
    } else if (objectType === "scale-down") {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: scaleDownRatio,
          scaleY: scaleDownRatio,
        }
      )
    } else {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
        }
      )
    }
    editor.canvas.centerObject(img)
    editor.canvas.renderAll()
  })
}
