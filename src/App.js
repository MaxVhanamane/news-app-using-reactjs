import './App.css';
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App ()  {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY

const [progress,setProgress]=useState(0)


const setProgressVal = (progressVal) => {
    setProgress(progressVal)
  }

    return (
      // To avoid reloading of page when we move to another link or page we use Router. 
      <Router>
        <div>
          {/* LoadingBar is used to show page loading progress. read documentation for better understanding. */}
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
          <Navbar />

          <Routes>

            <Route exact path="/" element={<News key="home" pageSize={15} setProgress={setProgressVal} apiKey={apiKey} category="general" title="Home"/>} />
            <Route exact path="/business" element={<News key="business" pageSize={15} setProgress={setProgress} apiKey={apiKey} category="business" title="Business"/>} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={15} setProgress={setProgress} apiKey={apiKey} category="entertainment" title="Entertainment"/>} />
            <Route exact path="/health" element={<News key="health" pageSize={15} setProgress={setProgress} apiKey={apiKey} category="health" title="Health"/>} />
            <Route exact path="/sports" element={<News key="sports" pageSize={15} setProgress={setProgress} apiKey={apiKey} category="sports"title="Sports" />} />
            <Route exact path="/science" element={<News key="science" pageSize={15} setProgress={setProgress} apiKey={apiKey} category="science" title="Science"/>} />
            <Route exact path="/technology" element={<News key="technology" pageSize={15} setProgress={setProgress} apiKey={apiKey} category="technology" title="Technology"/>} />

          </Routes>

        </div>
      </Router>
    )
  
}


