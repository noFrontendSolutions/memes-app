import React, { useState, useRef, useEffect } from "react"
import { fabric } from "fabric" // this also installed on your project
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react"

import SelectObjectFit from "../components/meme-creator-components/SelectObjectFit"
import SelectBackgroundColor from "../components/meme-creator-components/SelectBackgroundColor"
import AddText from "../components/meme-creator-components/AddText"
import SelectTextColor from "../components/meme-creator-components/SelectTextColor"
import SelectBackgroundImage from "../components/meme-creator-components/SelectBackgroundImage"
import AddImage from "../components/meme-creator-components/AddImage"
import DownloadMeme from "../components/meme-creator-components/DownloadMeme"
import RemoveActiveObject from "../components/meme-creator-components/RemoveActiveObject"

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
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File>(null)
  const [textColor, setTextColor] = useState<TextColorType>("black")

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
        height: screenHeight / 1.3,
      })
    } else {
      editor?.canvas.setDimensions({
        width: screenWidth / 2,
        height: screenHeight / 1.8,
      })
    }
  }, [editor])

  return (
    <div className="min-h-screen p-2 bg-slate-700 flex flex-col justify-start items-center lg:items-center">
      <div>
        <div className="mt-2 mb-2 font-titillium bg-slate-900 text-slate-400 flex flex-col lg:flex-row justify-between items-start lg:items-center rounded">
          <div className="flex justify-start lg:justify-center flex-col lg:flex-row lg:items-center items-start rounded">
            <SelectBackgroundImage
              setBackgroundUrl={setBackgroundUrl}
              setBackgroundFile={setBackgroundFile}
            />
            <SelectObjectFit
              objectType={objectType}
              setObjectType={setObjectType}
            />
          </div>
          <div className="lg:hidden bg-slate-700 h-2 w-full"></div>
          <AddImage
            setImageUrl={setImageUrl}
            setImageFile={setImageFile}
            editor={editor}
          />
        </div>
        <div className="mb-2 mt-2 lg:mt-0 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-slate-900 h-16 rounded">
          <SelectTextColor
            textColor={textColor}
            setTextColor={setTextColor}
            editor={editor}
          />

          <AddText
            text={text}
            setText={setText}
            textColor={textColor}
            editor={editor}
          />
        </div>
        <div className="w-full bg-slate-700 lg:hidden h-16 sm:h-12"></div>
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
        <div className="mt-2 bg-slate-900 flex flex-col lg:flex-row justify-between items-start lg:items-center rounded">
          <SelectBackgroundColor
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            editor={editor}
          />
          <div className="sm:hidden bg-slate-700 h-2 w-full"></div>
          <div className="flex">
            <RemoveActiveObject editor={editor} />
            <DownloadMeme editor={editor} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeCreator

/*******************************************************************************************************************************
 *****************************************************Helper Functions**********************************************************
 *******************************************************************************************************************************/

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
