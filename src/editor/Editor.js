import React from "react";
import Toolbar from "../toolbar/Toolbar.js";
import "./Editor.css";

const COMMAND_LIMIT = 50;


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

  matchWordEvent(e){
    var id = "editorContent" + this.state.current_id.toString();
    var node = document.getElementById(id);
    var [exact_match, interpreted_match] = this.getLastWord(node.innerHTML);
    if(interpreted_match === undefined || exact_match === undefined) console.log("undefined behaviour for word match event");
    else {
      console.log("word:",interpreted_match);
      if(interpreted_match === "integral"){
        console.log("matched to existing command")
        document.getElementById(id).innerHTML= node.innerHTML.replace("integral", '<span> &#8747; </span>')
      }
    };

  }

  getLastWord(full_text){
    var last_index = full_text.length -1;
    for(var i = last_index; i > 0; i--){
      if(full_text[i] === " " || last_index - i > COMMAND_LIMIT || i === 0){
        const exact_match = full_text.slice(i, last_index);
        var interpreted_match = exact_match.replace(" ", "");
        interpreted_match = interpreted_match.replace("&nbsp", "");
        console.log(interpreted_match);
        return [exact_match, interpreted_match];
      }
    }
    return full_text;
  }




  render(){
    return (
      <div>
        <Toolbar />

        <div>
        <div
        className = "editorContainer"
        id = "editorContainer"
        onKeyDown = {(e) => this.handleKeyDown(e)}
        onKeyUp = {(e) => this.handleKeyUp(e)}>
            <div className = "editorcontent"
            spellCheck = {true}
            onInput = {(e) => this.matchWordEvent(e)}
            id = "editorContent0"
            contentEditable='true'
            onClick = {(e) => this.setID(e.target.id)}>
            </div>
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
