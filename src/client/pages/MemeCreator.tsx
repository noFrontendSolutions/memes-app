import React, { useEffect, useState, useRef } from "react"
import { fabric } from "fabric" // this also installed on your project
import {
  FabricJSCanvas,
  FabricJSEditor,
  useFabricJSEditor,
} from "fabricjs-react"
import landscape from "../../../static-assets/landscape.png"
import landscapeStretch from "../../../static-assets/landscape-stretch.png"
import landscapeFit from "../../../static-assets/landscape-fit.png"

type CanvasLayout = "vertical" | "horizontal" | "squared"
type ObjectType = "none" | "stretch" | "fit"

//***********Main Component********************************

const MemeCreator = () => {
  const { editor, onReady } = useFabricJSEditor()
  const [text, setText] = useState("")
  const frameRef = useRef<HTMLDivElement>()
  const [objectType, setObjectType] = useState<ObjectType>("none")
  const [canvasLayout, setCanvasLayout] = useState<CanvasLayout>("vertical")
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
    <div className="h-screen w-screen">
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
      <label htmlFor="layout-field"></label>
      <fieldset id="layout-field" className="m-4 flex">
        <button
          className="m-2 w-[60px] h-[60px] border-slate-700 border-2 bg-slate-200 flex justify-center items-center"
          title="Squared"
        >
          <div className="w-[40px] h-[40px] border-2 border-slate-400 bg-slate-200"></div>
        </button>
        <button
          className="m-2 w-[60px] h-[60px] border-slate-700 border-2 bg-slate-200 flex justify-center items-center"
          title="Vertical"
        >
          <div className="w-[20px] h-[40px] border-2 border-slate-400 bg-slate-200"></div>
        </button>
        <button
          className="m-2 w-[60px] h-[60px] border-slate-700 border-2 bg-slate-200 flex justify-center items-center"
          title="Horizontal"
        >
          <div className="w-[40px] h-[20px] border-2 border-slate-400 bg-slate-200"></div>
        </button>
      </fieldset>
      <label htmlFor="object-layout"></label>
      <fieldset id="object-layout" className="m-4 flex">
        <button
          className="m-2 border-4 object-fill w-16 h-16"
          title="Object None"
          onClick={() => onObjectNone(editor, backgroundUrl, setObjectType)}
        >
          <img src={landscape} />
        </button>
        <button
          className="m-2 border-4 object-fill w-16 h-16"
          title="Object Fit"
          onClick={() => onObjectFit(editor, backgroundUrl, setObjectType)}
        >
          <img src={landscapeFit} />
        </button>
        <button
          className="m-2 border-4 object-fill w-16 h-16"
          title="Object Stretch"
          onClick={() => onObjectStretch(editor, backgroundUrl, setObjectType)}
        >
          <img src={landscapeStretch} className="w-20 h-14" />
        </button>
      </fieldset>
      <div ref={frameRef} className="h-1/2 w-1/2 border-2 bg-slate-400">
        <FabricJSCanvas onReady={onReady} className="h-full w-full" />
      </div>
    </div>
  )
}

export default MemeCreator

/******************************************
 *****************Functions*****************
 *******************************************/

const onObjectNone = (
  editor: FabricJSEditor,
  background: string,
  setObjectFit: React.Dispatch<React.SetStateAction<ObjectType>>
) => {
  setObjectFit("none")
  fabric.Image.fromURL(background, (img) => {
    const widthRatio = editor.canvas.width / img.width
    const heightRatio = editor.canvas.width / img.height
    const ratio = Math.min(widthRatio, heightRatio)
    {
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

const onObjectFit = (
  editor: FabricJSEditor,
  background: string,
  setObjectFit: React.Dispatch<React.SetStateAction<ObjectType>>
) => {
  setObjectFit("fit")
  fabric.Image.fromURL(background, (img) => {
    const widthRatio = editor.canvas.width / img.width
    const heightRatio = editor.canvas.width / img.height
    const ratio = Math.min(widthRatio, heightRatio)
    {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: ratio,
          scaleY: ratio,
        }
      )
    }
    editor.canvas.centerObject(img)
    editor.canvas.renderAll()
  })
}

const onObjectStretch = (
  editor: FabricJSEditor,
  background: string,
  setObjectFit: React.Dispatch<React.SetStateAction<ObjectType>>
) => {
  setObjectFit("stretch")
  fabric.Image.fromURL(background, (img) => {
    const widthRatio = editor.canvas.width / img.width
    const heightRatio = editor.canvas.width / img.height
    const ratio = Math.min(widthRatio, heightRatio)
    {
      editor.canvas.setBackgroundImage(
        img,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          crossOrigin: "anonymous",
          scaleX: editor.canvas.width / img.width,
          scaleY: editor.canvas.height / img.height,
        }
      )
    }
    editor.canvas.centerObject(img)
    editor.canvas.renderAll()
  })
}

const onAddBackground = (
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
