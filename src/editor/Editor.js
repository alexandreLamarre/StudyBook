import React from "react";
import Toolbar from "../toolbar/Toolbar.js";
import "./Editor.css";

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current_id : 1,
    };
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  addCell(e){
    e.preventDefault();
    var new_node = document.createElement("div");
    const new_id = "editorContent"+this.state.current_id.toString();
    this.setState({current_id: this.state.current_id+1})
    new_node.setAttribute("id", new_id);
    new_node.className = "editorcontent";
    new_node.setAttribute("contentEditable", "true");
    console.log(new_node);
    var el = document.getElementById("editorContainer");
    el.appendChild(new_node)
  }

  render(){
    return (
      <div>
        <Toolbar />
        <div id = "editorContainer">
            <div className = "editorcontent"
            id = "editorContent0"
            contentEditable='true'>
            </div>
        </div>
        <button
        className = "cellButton"
        onClick = {(e) => this.addCell(e)}
        onMouseDown = {(e) => e.preventDefault()}
        >
          Add a new cell
        </button>
      </div>
    )
  }
}

export default Editor;
