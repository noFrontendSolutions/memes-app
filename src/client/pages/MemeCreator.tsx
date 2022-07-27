import React, { useState, useEffect } from "react"
import { fabric } from "fabric" // this also installed on your project
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react"
import SelectObjectFit from "../components/meme-creator/SelectObjectFit"
import SelectBackgroundColor from "../components/meme-creator/SelectBackgroundColor"
import AddText from "../components/meme-creator/AddText"
import SelectTextColor from "../components/meme-creator/SelectTextColor"
import SelectBackgroundImage from "../components/meme-creator/SelectBackgroundImage"
import AddImage from "../components/meme-creator/AddImage"
import DownloadMeme from "../components/meme-creator/DownloadMeme"
import RemoveActiveObject from "../components/meme-creator/RemoveActiveObject"
import SelectSpecialFeature from "../components/meme-creator/SelectSpecialFeature"

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
  const [fillColor, setFillColor] = useState<TextColorType>("black")

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
        width: screenWidth,
        height: screenHeight,
      })
    } else {
      editor?.canvas.setDimensions({
        width: screenWidth / 1.8,
        height: screenHeight / 1.8,
      })
    }
  }, [editor])

  return (
    <div className="min-h-screen p-2 bg-black flex flex-col justify-start items-center lg:items-center">
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
          <div className="lg:h-[70px] lg:w-2 bg-slate-700 h-2 w-full "></div>
          <AddImage editor={editor} />
        </div>
        <div className="mb-2 mt-2 lg:mt-0 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-slate-900 h-16 rounded">
          <SelectTextColor
            textColor={textColor}
            setTextColor={setTextColor}
            fillColor={fillColor}
            setFillColor={setFillColor}
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
          <div className="w-full lg:w-fit flex justify-between items-center">
            <SelectBackgroundColor
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              editor={editor}
            />
            <div className="lg:h-16 lg:w-2 lg:bg-slate-700"></div>
            <SelectSpecialFeature
              textColor={textColor}
              fillColor={fillColor}
              editor={editor}
            />
          </div>
          <div className="lg:h-16 lg:w-2 lg:bg-slate-700"></div>
          <div className="sm:hidden bg-slate-700 h-2 w-full"></div>
          <div className="flex justify-between items-center w-full lg:w-fit">
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
