import React from "react"

const ErrorDisplay = ({
  errorMessage,
  setError,
}: {
  errorMessage: string
  setError: React.Dispatch<React.SetStateAction<any>>
}) => {
  return (
    <>
      {setTimeout(() => {
        setError(null)
      }, 5000) && <p className="mt-2 text-red-500 font-bold">{errorMessage}</p>}
    </>
  )
}

export default ErrorDisplay
