import logo from './logo.svg';
import './App.css';
import Editor from "./editor/Editor.js";
import React from "react";


function App() {
  return (
    <div className="App">
      <Editor height={window.innerHeight}/>
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    </div>
  );
}

export default App;
