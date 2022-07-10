import React, { useState, useRef, useEffect } from "react"
import { fabric } from "fabric" // this also installed on your project
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"

import ObjectFit from "../components/meme-creator-components/ObjectFit"

type CanvasLayoutType = "vertical" | "horizontal" | "squared"
type ObjectType = "none" | "fill" | "contain" | "cover" | "scale-down"

//***********Main Component********************************

const MemeCreator = () => {
  const { editor, onReady } = useFabricJSEditor()
  const [text, setText] = useState("")
  const frameRef = useRef<HTMLDivElement>()
  const [objectType, setObjectType] = useState<ObjectType>("none")
  const [canvasLayout, setCanvasLayout] = useState<CanvasLayoutType>("vertical")
  const [backgroundUrl, setBackgroundUrl] = useState("")
  const [backgroundFile, setBackgroundFile] = useState<File>(null)
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

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

  useEffect(() => {
    if (backgroundUrl) {
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
  }, [backgroundUrl, canvasLayout, objectType])

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

      <div
        className={"mt-16  border border-emerald-500 bg-slate-800"}
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
  setBackgroundFile: React.Dispatch<React.SetStateAction<File>>
) => {
  const imageFile = e.target.files[0]
  setBackground(URL.createObjectURL(imageFile))
  setBackgroundFile(imageFile)
}
