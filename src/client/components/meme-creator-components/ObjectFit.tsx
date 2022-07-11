import React, { useEffect, useState, useRef } from "react"
import defaultImg from "../../../../static-assets/default.png"
import miniImg from "../../../../static-assets/mini-image.png"
import smallerImg from "../../../../static-assets/default-smaller.png"
type ObjectType = "none" | "fill" | "contain" | "cover" | "scale-down"

const ObjectFit = ({
  objectType,
  setObjectType,
}: {
  objectType: ObjectType
  setObjectType: React.Dispatch<React.SetStateAction<ObjectType>>
}) => {
  const [isActiveField, setIsActiveField] = useState({
    none: true,
    contain: false,
    fill: false,
    cover: false,
    scaleDown: false,
  })

  return (
    <>
      <label htmlFor="object-fit"></label>
      <fieldset
        id="object-fit"
        className="flex bg-slate-900 rounded justify-center items-center"
      >
        <dl className="mr-2">Object-Fit:</dl>
        <button
          className={
            objectType === "none"
              ? "mx-2 border-2 border-emerald-500 w-12 h-12 flex items-center justify-center"
              : "mx-2 border-2 border-slate-800 w-12 h-12 flex items-center justify-center"
          }
          title="Object None: Display an element's content at its original size ignoring the container size."
          onClick={() => setObjectType("none")}
        >
          <img src={smallerImg} className="w-12 h-12 object-none" />
        </button>
        <button
          className={
            objectType === "contain"
              ? "mx-2 border-2 border-emerald-500 w-12 h-12 flex items-center justify-center"
              : "mx-2 border-2 border-slate-800 w-12 h-12 flex items-center justify-center"
          }
          title="Object Contain: Resize an element’s content to stay contained within its container."
          onClick={() => setObjectType("contain")}
        >
          <img src={defaultImg} className=" object-contain w-12 h-12" />
        </button>
        <button
          className={
            objectType === "fill"
              ? "mx-2 border-2 border-emerald-500 w-12 h-12"
              : "mx-2 border-2 border-slate-800 w-12 h-12"
          }
          title="Object Fill: Stretch an element's content to fit its container."
          onClick={() => setObjectType("fill")}
        >
          <img src={defaultImg} className="object-fill w-12 h-12" />
        </button>
        <button
          className={
            objectType === "cover"
              ? "mx-2 border-2 border-emerald-500 w-12 h-12"
              : "mx-2 border-2 border-slate-800 w-12 h-12"
          }
          title="Object Cover: Resize an element’s content to cover its container."
          onClick={() => setObjectType("cover")}
        >
          <img src={defaultImg} className=" w-12 h-12 object-cover" />
        </button>
        <button
          className={
            objectType === "scale-down"
              ? "mx-2 border-2 border-emerald-500 flex justify-center items-center"
              : "mx-2 border-2 border-slate-800 flex justify-center items-center"
          }
          title="Object Scale-Down: Display an element’s content at its original size but scale it down to fit its container if necessary."
          onClick={() => setObjectType("scale-down")}
        >
          <img src={miniImg} className="w-12 h-12 object-none" />
        </button>
      </fieldset>
    </>
  )
}

export default ObjectFit
