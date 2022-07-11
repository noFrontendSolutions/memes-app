import React, { useState, useRef, useEffect } from "react"
import { fabric } from "fabric" // this also installed on your project
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react"

import ObjectFit from "../components/meme-creator-components/ObjectFit"
import BackgroundColor from "../components/meme-creator-components/BackgroundColor"
import AddText from "../components/meme-creator-components/AddText"
import TextColor from "../components/meme-creator-components/TextColor"
import BackgroundImage from "../components/meme-creator-components/BackgroundImage"

type BackgroundColorType = "white" | "black" | "transparent"
type TextColorType = "white" | "black" | "green" | "red" | "yellow" | "blue"
type ObjectType = "none" | "fill" | "contain" | "cover" | "scale-down"

//***********Main Component********************************

const MemeCreator = () => {
  const { editor, onReady } = useFabricJSEditor()
  const [text, setText] = useState("")
  const [objectType, setObjectType] = useState<ObjectType>("none")
  const [backgroundColor, setBackgroundColor] =
    useState<BackgroundColorType>("transparent")
  const [backgroundUrl, setBackgroundUrl] = useState("")
  const [backgroundFile, setBackgroundFile] = useState<File>(null)
  const [textColor, setTextColor] = useState<TextColorType>("black")

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
      <div className="mt-2">
        <div className="mt-4 mb-2 font-titillium bg-slate-900 text-slate-400 flex justify-between items-center rounded">
          <BackgroundImage
            onAddBackground={onAddBackground}
            setBackgroundUrl={setBackgroundUrl}
            setBackgroundFile={setBackgroundFile}
          />

          <label htmlFor="canvas-layout"></label>
          <label htmlFor="ratio-layout"></label>

          <ObjectFit objectType={objectType} setObjectType={setObjectType} />
        </div>
        <TextColor
          textColor={textColor}
          setTextColor={setTextColor}
          editor={editor}
        />
        <div className="flex flex-row justify-between w-full">
          <AddText
            text={text}
            setText={setText}
            textColor={textColor}
            editor={editor}
          />

          <BackgroundColor
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            editor={editor}
          />
        </div>
        <div className={"border border-emerald-500"}>
          <FabricJSCanvas
            onReady={onReady}
            className={
              backgroundColor === "black"
                ? "h-full bg-black"
                : backgroundColor === "white"
                ? "h-full bg-white"
                : "h-full bg-slate-800"
            }
          />
        </div>
      </div>
      <fieldset className="border-2 p-2">
        <button onClick={onDownloadImage} className="border-2 m-2 p-2">
          Export
        </button>
      </fieldset>
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
