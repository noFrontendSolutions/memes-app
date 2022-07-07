import React, { useEffect, useState, useRef } from "react"
import { fabric } from "fabric" // this also installed on your project
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"

const img =
  "https://cdn.shopify.com/s/files/1/0405/3041/1672/products/smiling-woman-poses_925x_856ee098-fd4f-4876-9a04-f773f5b83d4e_1024x1024@2x.jpg?v=1591045694"

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
        //image.set({
        //scaleX: editor.canvas.width / imgObj.width,
        //scaleY: editor.canvas.height / imgObj.height,
        //})
        //editor.canvas.centerObject(image) //centers image in Canvas
        //editor.canvas.add(image) // Adds image to canvas
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
      </fieldset>
      <div ref={frameRef} className="h-1/2 w-1/2 border-2 bg-slate-400">
        <FabricJSCanvas onReady={onReady} className="h-full w-full" />
      </div>
    </div>
  )
}

export default MemeCreator
