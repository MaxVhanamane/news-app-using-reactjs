import loading from "./loading.gif"

import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-2 mb-2" >
     <img className="my-3" src={loading} alt="loading" />
      </div>
    )
  }
}
