import React from "react";
import Toolbar from "../toolbar/Toolbar.js";
import "./Editor.css";

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      new_id: 1,
      current_id : 0,
      deleteCellKeys: {16: false, 8: false},
    };
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  addCell(e){
    e.preventDefault();
    var new_node = document.createElement("div");
    const new_id = "editorContent"+this.state.new_id.toString();
    this.setState({new_id: this.state.new_id+1})
    new_node.setAttribute("id", new_id);
    console.log(new_id);
    new_node.className = "editorcontent";
    new_node.setAttribute("contentEditable", "true");
    new_node.onclick = () => this.setID(new_node.id);
    console.log(new_node);
    var el = document.getElementById("editorContainer");
    el.appendChild(new_node)
  }

  setID(id){
    console.log(id);
    console.log(id.slice(-1));
    this.setState({current_id: id.slice(-1)});
  }

  handleKeyDown(e){
    // update keys
    if(e.keyCode === 16) this.setState({deleteCellKeys: {16:true,
                                    8: this.state.deleteCellKeys[8]}});

    if(e.keyCode === 8) this.setState({deleteCellKeys: {16: this.state.deleteCellKeys[16],
                                                        8: true}});

    //check for triggered events
    if(this.state.deleteCellKeys[16] === true &&
        this.state.deleteCellKeys[8] === true){
          console.log("delete")
          const id = this.state.current_id;

          var node_to_delete = document.getElementById(
                            "editorContent"+ id.toString());
          console.log(node_to_delete);
          if(node_to_delete !== null && node_to_delete !== undefined) {
            node_to_delete.remove();
            this.setState({deleteCellKeys: {16:false, 8: false}});
          }
        }
  }


  handleKeyUp(e){
    if(e.keyCode === 16) this.setState({deleteCellKeys: {16:false,
                                    8: this.state.deleteCellKeys[8]}});

    if(e.keyCode === 8) this.setState({deleteCellKeys: {16: this.state.deleteCellKeys[16],
                                                        8: false}});
  }
  render(){
    return (
      <div>
        <Toolbar />
        <div id = "editorContainer"
        onKeyDown = {(e) => this.handleKeyDown(e)}
        onKeyUp = {(e) => this.handleKeyUp(e)}>
            <div className = "editorcontent"
            id = "editorContent0"
            contentEditable='true'
            onClick = {(e) => this.setID(e.target.id)}>
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
