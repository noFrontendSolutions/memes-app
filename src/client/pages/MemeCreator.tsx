import React, { useEffect, useState, useRef } from "react"
import { fabric } from "fabric" // this also installed on your project
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import landscape from "../../../static-assets/landscape.png"
import landscapeBorderless from "../../../static-assets/landscape-borderless.png"
import landscapeCrop from "../../../static-assets/landscape-crop.png"

const img =
  "https://cdn.shopify.com/s/files/1/0405/3041/1672/products/smiling-woman-poses_925x_856ee098-fd4f-4876-9a04-f773f5b83d4e_1024x1024@2x.jpg?v=1591045694"

type CanvasLayout = "vertical" | "horizontal" | "squared"

const MemeCreator = () => {
  const [text, setText] = useState("")
  const { editor, onReady } = useFabricJSEditor()
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const frameRef = useRef<HTMLDivElement>()

  const cropCanvas = (e: React.MouseEvent<HTMLButtonElement>) => {
    frameRef.current.style.height = `${imgHeight}px`
    frameRef.current.style.width = `${imgWidth}px`
  }

  useEffect(() => {
    if (editor) {
      //This is for Textcolor and fill color for shaped
      editor.setFillColor("#FF0000")
      editor.setStrokeColor("#FF0000")

      // this is to create background image
      let imgObj = new Image()
      imgObj.src =
        "https://cdn.shopify.com/s/files/1/0405/3041/1672/products/smiling-woman-poses_925x_856ee098-fd4f-4876-9a04-f773f5b83d4e_1024x1024@2x.jpg?v=1591045694"
      imgObj.onload = () => {
        let image = new fabric.Image(imgObj)
        setImgHeight(imgObj.height)
        setImgWidth(imgObj.width)
        //add background image (not moveable)
        editor.canvas.setBackgroundImage(
          img,
          editor.canvas.renderAll.bind(editor.canvas),
          {
            crossOrigin: "anonymous",
            scaleX: editor.canvas.width / imgObj.width,
            scaleY: editor.canvas.height / imgObj.height,
          }
        )

        // USe this for movale Image
        //image.set({
        //scaleX: editor.canvas.width / imgObj.width,
        //scaleY: editor.canvas.height / imgObj.height,
        //})

        //**** Centers image in Canvas*****
        //editor.canvas.centerObject(image)

        //****** Adds image to canvas *****
        //editor.canvas.add(image)
        editor.canvas.renderAll()
      }
    }
  }, [editor])

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
          <input id="file-upload" type="file" className="hidden" />
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
          title="Object Scale-Down"
        >
          <img src={landscape} className="" />
        </button>
        <button
          className="m-2 border-4 object-fill w-16 h-16"
          title="Object Stretch"
        >
          <img src={landscapeBorderless} className="w-20 h-14" />
        </button>
        <button
          className="m-2 border-4 object-fill w-16 h-16"
          title="Object Crop"
        >
          <img src={landscapeCrop} />
        </button>
      </fieldset>
      <div ref={frameRef} className="h-1/2 w-1/2 border-2 bg-slate-400">
        <FabricJSCanvas onReady={onReady} className="h-full w-full" />
      </div>
    </div>
  )
}

export default MemeCreator
