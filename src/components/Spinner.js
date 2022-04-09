import loading from "./loading.gif"

import React from 'react'

export default function Spinner() {
    return (
      <div className="text-center my-2 mb-2" >
     <img className="my-3" src={loading} alt="loading" />
      </div>
    )
}
