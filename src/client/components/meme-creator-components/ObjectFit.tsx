import React, { useEffect, useState, useRef } from "react"
import defaultImg from "../../../../static-assets/default.png"
import miniImg from "../../../../static-assets/mini-image.png"

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
      <fieldset id="object-fit" className="m-4 flex">
        <button
          className={
            objectType === "none"
              ? "m-2 border-2 border-emerald-500"
              : "m-2 border-2 border-slate-800"
          }
          title="Object None"
          onClick={() => setObjectType("none")}
        >
          <img src={defaultImg} className=" w-16 h-16 object-none" />
        </button>
        <button
          className={
            objectType === "contain"
              ? "m-2 border-2 border-emerald-500"
              : "m-2 border-2 border-slate-800"
          }
          title="Object Contain"
          onClick={() => setObjectType("contain")}
        >
          <img src={defaultImg} className=" w-16 h-16 object-contain" />
        </button>
        <button
          className={
            objectType === "fill"
              ? "m-2 border-2 border-emerald-500"
              : "m-2 border-2 border-slate-800"
          }
          title="Object Fill"
          onClick={() => setObjectType("fill")}
        >
          <img src={defaultImg} className=" w-16 h-16 object-fill" />
        </button>
        <button
          className={
            objectType === "cover"
              ? "m-2 border-2 border-emerald-500"
              : "m-2 border-2 border-slate-800"
          }
          title="Object Cover"
          onClick={() => setObjectType("cover")}
        >
          <img src={defaultImg} className=" w-16 h-16 object-cover" />
        </button>
        <button
          className={
            objectType === "scale-down"
              ? "m-2 border-2 border-emerald-500 flex justify-center items-center"
              : "m-2 border-2 border-slate-800 flex justify-center items-center"
          }
          title="Object Scale-Down"
          onClick={() => setObjectType("scale-down")}
        >
          <img src={miniImg} className="w-16 h-16 object-none" />
        </button>
      </fieldset>
    </>
  )
}

export default ObjectFit
