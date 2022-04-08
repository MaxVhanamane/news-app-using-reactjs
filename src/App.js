import './App.css';
import Navbar from "./components/Navbar"
import News from "./components/News"
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  render() {
    return (
      <Router>
      <div>
        <Navbar />

        <Routes>

          <Route exact path="/"  element={<News key="home" pageSize={15} apiKey={this.apiKey}  category="general" />} />
          <Route exact path="/business"  element={ <News key="business" pageSize={15} apiKey={this.apiKey} category="business" />} />
          <Route exact path="/entertainment"  element={<News key="entertainment" pageSize={15} apiKey={this.apiKey} category="entertainment" />} />
          <Route exact path="/general"  element={<News key="general" pageSize={15} apiKey={this.apiKey} category="general" />} />
          <Route exact path="/health"  element={ <News key="health" pageSize={15} apiKey={this.apiKey} category="health" />} />
          <Route exact path="/sports"  element={<News key="sports" pageSize={15} apiKey={this.apiKey} category="sports" />} />
          <Route exact path="/science"  element={<News key="science" pageSize={15} apiKey={this.apiKey} category="science" />} />
          <Route exact path="/technology"  element={ <News key="technology" pageSize={15} apiKey={this.apiKey} category="technology" />} />
        
        </Routes>

      </div>
      </Router>
    )
  }
}


