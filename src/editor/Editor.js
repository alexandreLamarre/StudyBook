import React from "react";
import Toolbar from "../toolbar/Toolbar.js";
import "./Editor.css";

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render(){
    return (
      <div>
        <Toolbar />
        <div id = "editorContent"
        style = {{height: this.props.height*0.85}}
        contentEditable='true'>
        </div>
      </div>
    )
  }
}

export default Editor;
