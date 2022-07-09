import React, { useState, useRef, useEffect } from "react"
import { fabric } from "fabric" // this also installed on your project
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react"

import AspectRatio from "../components/meme-creator-components/AspectRatio"
import CanvasLayout from "../components/meme-creator-components/CanvasLayout"

type CanvasLayoutType = "vertical" | "horizontal" | "squared"
type ObjectType = "none" | "stretch" | "fit"

//***********Main Component********************************

const MemeCreator = () => {
  const { editor, onReady } = useFabricJSEditor()
  const [text, setText] = useState("")
  const frameRef = useRef<HTMLDivElement>()
  const [objectType, setObjectType] = useState<ObjectType>("none")
  const [canvasLayout, setCanvasLayout] = useState<CanvasLayoutType>("vertical")
  const [backgroundUrl, setBackgroundUrl] = useState("")

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  const cropCanvas = (e: React.MouseEvent<HTMLButtonElement>) => {
    frameRef.current.style.height = `${imgHeight}px`
    frameRef.current.style.width = `${imgWidth}px`
  }

  const onExport = () => {
    let image = new Image()
    image.crossOrigin = "anonymous"
    image.src = editor.canvas.toDataURL()
    let w = window.open("")
    w.document.write(image.outerHTML)
  }

  const onAddText = () => {
    editor.addText(text)
    setText("")
  }

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
          <button className="border-2 m-2 p-2" onClick={cropCanvas}>
            Crop Canvas
          </button>
          <button onClick={onExport} className="border-2 m-2 p-2">
            Export
          </button>
          <label htmlFor="file-upload" className="cursor-pointer border-2">
            Upload File
            <input
              id="file-upload"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onAddBackground(e, setBackgroundUrl, editor, objectType)
              }
              type="file"
              className="hidden"
            />
          </label>
        </fieldset>
        <label htmlFor="canvas-layout"></label>
        <CanvasLayout
          editor={editor}
          canvasLayout={canvasLayout}
          setCanvasLayout={setCanvasLayout}
          backgroundUrl={backgroundUrl}
        />
        <label htmlFor="ratio-layout"></label>
        <AspectRatio
          editor={editor}
          setObjectType={setObjectType}
          backgroundUrl={backgroundUrl}
        />
      </div>

      <div
        className={
          canvasLayout === "vertical"
            ? "mt-16 h-[450px] w-[1000px] border border-emerald-500 bg-slate-800"
            : canvasLayout === "horizontal"
            ? "mt-8 h-[700px] w-[350px] border border-emerald-500  bg-slate-800"
            : "mt-16 h-[600px] w-[600px] border border-emerald-500  bg-slate-800"
        }
        ref={frameRef}
      >
        <FabricJSCanvas onReady={onReady} className="h-full" />
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
  editor: FabricJSEditor,
  objectType: ObjectType
) => {
  const imageFile = e.target.files[0]
  setBackground(URL.createObjectURL(imageFile))
  fabric.Image.fromURL(URL.createObjectURL(imageFile), (img) => {
    const widthRatio = editor.canvas.width / img.width
    const heightRatio = editor.canvas.width / img.height
    const ratio = Math.min(widthRatio, heightRatio)
    if (objectType === "fit") {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: ratio,
          scaleY: ratio,
        }
      )
    } else if (objectType === "stretch") {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: editor.canvas.width / img.width,
          scaleY: editor.canvas.height / img.height,
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
