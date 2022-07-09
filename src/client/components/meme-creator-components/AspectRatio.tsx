import React, { useEffect, useState, useRef } from "react"
import { fabric } from "fabric" // this also installed on your project
import { FabricJSEditor, useFabricJSEditor } from "fabricjs-react"
import landscape from "../../../../static-assets/landscape.png"
import landscapeStretch from "../../../../static-assets/landscape-stretch.png"
import landscapeFit from "../../../../static-assets/landscape-fit.png"

type ObjectType = "none" | "stretch" | "fit"

const AspectRatio = ({
  editor,
  setObjectType,
  backgroundUrl,
}: {
  editor: FabricJSEditor
  setObjectType: React.Dispatch<React.SetStateAction<ObjectType>>
  backgroundUrl: string
}) => {
  return (
    <>
      <label htmlFor="ratio-layout"></label>
      <fieldset id="ratio-layout" className="m-4 flex">
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
    </>
  )
}

export default AspectRatio

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
