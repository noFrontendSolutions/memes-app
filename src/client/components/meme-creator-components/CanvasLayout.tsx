import { FabricJSEditor } from "fabricjs-react"
import React from "react"
type CanvasLayoutType = "vertical" | "horizontal" | "squared"
import { onAddBackground } from "../../pages/MemeCreator"

const CanvasLayout = ({
  editor,
  canvasLayout,
  setCanvasLayout,
  backgroundUrl,
}: {
  editor: FabricJSEditor
  canvasLayout: CanvasLayoutType
  setCanvasLayout: React.Dispatch<React.SetStateAction<CanvasLayoutType>>
  backgroundUrl: string
}) => {
  return (
    <>
      <fieldset id="canvas-layout" className="m-4 flex">
        <button
          className="m-2 w-[60px] h-[60px] border-slate-700 border-2 bg-slate-200 flex justify-center items-center"
          title="Squared"
          onClick={() => setCanvasLayout("squared")}
        >
          <div className="w-[40px] h-[40px] border-2 border-slate-400 bg-slate-200"></div>
        </button>
        <button
          className="m-2 w-[60px] h-[60px] border-slate-700 border-2 bg-slate-200 flex justify-center items-center"
          title="Vertical"
          onClick={() => setCanvasLayout("horizontal")}
        >
          <div className="w-[20px] h-[40px] border-2 border-slate-400 bg-slate-200"></div>
        </button>
        <button
          className="m-2 w-[60px] h-[60px] border-slate-700 border-2 bg-slate-200 flex justify-center items-center"
          title="Horizontal"
          onClick={() => setCanvasLayout("vertical")}
        >
          <div className="w-[40px] h-[20px] border-2 border-slate-400 bg-slate-200"></div>
        </button>
      </fieldset>
    </>
  )
}

export default CanvasLayout
