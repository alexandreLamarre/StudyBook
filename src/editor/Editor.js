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
      fid: 0,
      prevCaretPos: 0,
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
    new_node.oninput = (e) => this.matchWordEvent(e);
    console.log(new_node);
    var el = document.getElementById("editorContainer");
    el.appendChild(new_node);
  }

  setID(id){
    console.log("element id:",id);
    var sel = document.getSelection();
    console.log("collapsed?", sel.isCollapsed);
    console.log("focusOffset:",sel.focusOffset);
    var el = document.getElementById(id);
    el.focus();
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
    const cid = this.state.current_id.toString();
    // var id = "editorContent" + cid;
    var node = document.getElementById(e.target.id);
    var sel = window.getSelection();
    // console.log("selection", sel);
    // console.log("id", e.target.id);
    const caretPos = e.target.id.startsWith("formula")? sel.anchorOffset: sel.focusOffset;
    console.log("focusoffset:", sel.focusOffset, "anchorOffset:", sel.anchorOffset);
    console.log("offset", caretPos);
    if(node === null || node === undefined){
      console.log("text match error");
      return;
    }
    const [exact_match, interpreted_match] = this.getLastWord(node.innerText, caretPos);
    if(interpreted_match === null || exact_match === null || interpreted_match === undefined || exact_match === undefined) console.log("undefined behaviour for word match event");
    else {
      console.log("word", interpreted_match);
      console.log("starts with complicated character", !(isLetter(interpreted_match.charAt(0))) );
      for(var i = 0; i < interpreted_match.length; i++){
        console.log("char:",interpreted_match[i], "unicode:", interpreted_match.charCodeAt(i));;
      }
      console.log("is word === integral?", interpreted_match === "integral");
      if(interpreted_match === "integral"){
        console.log("matched to existing command")
        document.getElementById(e.target.id).innerHTML
      = node.innerHTML.replace("integral", '<span contentEditable = "false" id = "symbol'+ cid +'">&#8747;<div id = "formula'+ this.state.fid.toString()+ + cid + '" contentEditable = "true"/> </span>');
      const new_fid = this.state.fid + 1;
      this.setState({fid: new_fid});
      var formulaToFocus = document.getElementById("formula" + (new_fid-1).toString()+ cid);
      formulaToFocus.focus();
      formulaToFocus.addEventListener("onkeypress", this.handleFormulaKey, false);

      // this.setState({prevCaretPos: caretPos+1});
      }
      if(interpreted_match === "fraction"){
        console.log("matched to existing command: fraction");
        const current_fid = this.state.fid;

        document.getElementById(e.target.id).innerHTML = node.innerHTML.replace("fraction", '<div class="frac"'+cid+'><span> <div contentEditable = "true" className = "formula'+current_fid.toString()+cid+'"> 1 </div></span><span class="symbol">/</span><span class="bottom"> <div contentEditable = "true" className = "formula"'+(current_fid+1).toString()+cid+'> 2 </div></span></div>');
        const new_fid = this.state.fid + 2;
        this.setState({fid: new_fid});
        var formulaToFocus = document.getElementById("formula" + (new_fid-1).toString()+ cid);
        // var formulaToFocus = document.getElementById("formula" + (new_fid-2).toString()+ cid);
        // formulaToFocus.focus();
      }
    };
  }

  handleFormulaKey(e){
    console.log("key pressed inside formula");
  }

  getLastWord(full_text, last_index){
    console.log("=======================================")
    console.log("full_text length", full_text.length,"last index", last_index);
    for(var i = 0; i < full_text.length; i++){
      console.log("char:", full_text[i], "unicode:", full_text.charCodeAt(i));
    }
    console.log("full focus text", full_text);
    for(var i = full_text.length; i >= full_text.length - last_index; i--){
      if(full_text[i-1] === " " || last_index - i > COMMAND_LIMIT || i === 0){
        const exact_match = full_text.slice(i, full_text.length);
        console.log("exact_match", exact_match);
        var interpreted_match = exact_match.replace(/[\W_]+/g, "");
        return [exact_match, interpreted_match];
      }
    }
    return full_text;
  }




  render(){
    return (
      <div>
        <Toolbar />


        <div
        className = "editorContainer"
        id = "editorContainer"
        onKeyDown = {(e) => this.handleKeyDown(e)}
        onKeyUp = {(e) => this.handleKeyUp(e)}>
            <div className = "editorcontent" align = "justifyLeft"
            onInput = {(e) => this.matchWordEvent(e)}
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
        <button
        className = "cellButton"
        >
          Math Keyboard
        </button>
        <input type = "text" list = "commands"/>
        <datalist id = "commands">
          <option value = "indefinite integral"> &#8747; </option>
          <option value = "definite integral"> &#8747; &sub3 &sup; &#78; </option>
        </datalist>

        <br></br>

        <div class="frac">
            <span>1</span>
            <span class="fracsymbol">/</span>
            <span class="bottom">2</span>

        </div>

      </div>
    )
  }
}

export default Editor;

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
