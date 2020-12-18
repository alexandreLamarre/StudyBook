import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Toolbar from "../toolbar/Toolbar.js";
import Suggestions from "./Suggestions.js";

import "./Editor.css";
const COMMAND_LIMIT = 50;


class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      initial_id: 0, // initial uuid for container and content
      current_id : 0,
      fid: 0,
      prevCaretPos: 0,
      extraElements: 0,
    };
    this.suggestions = React.createRef();
  }

  componentDidMount(){
    const initial_id = uuidv4();
    this.setState({initial_id: initial_id})
  }

  componentDidUpdate(){

  }
  // ==================== CELL BEHAVIOUR ====================================
  addCell(e){
    e.preventDefault();
    var new_node = this.createCellNode();
    console.log("newly created cell node:", new_node);
    var el = document.getElementById("editorContainer");
    el.appendChild(new_node);
  }

  createCellNode(){
    var new_node = document.createElement("div");
    const new_id = (uuidv4()).toString();
    const new_string_id = "editorContent_"+ new_id;
    console.log("newly created cell id:", new_string_id);
    this.setState({new_id: new_id});
    new_node.setAttribute("id", new_string_id);
    new_node.className = "editorContent";
    new_node.setAttribute("contentEditable", "true");
    new_node.onclick = () => this.setID(new_node.id);
    new_node.oninput = (e) => this.editorEvent(e);
    new_node.onkeydown = (e) => this.checkEditorKey(e);
    return new_node;
  }

  setID(id){
    console.log("element id:",id);
    var sel = document.getSelection();
    console.log("collapsed?", sel.isCollapsed);
    console.log("focusOffset:",sel.focusOffset);
    if(id){
      var el = document.getElementById(id);
      el.focus();
      this.setState({current_id: id});
    }
  }


  findElementId(id){
    let re = new RegExp("(_){1}(.)+$");
    let string_id = id.toString();
    let found = string_id.match(re);
    if(found === null) {
      console.log("CRITICAL ERROR -- ELEMENT HAS INVALID ID");
      return;
    }
    console.log("found id:", found[0].slice(1, found[0].length))
    return found[0].slice(1, found[0].length);
  }

  // ==================== END CELL BEHAVIOUR =================================

  // ========================= EDITOR BEHAVIOUR =====================
  checkEditorKey(e){
    // arrow keys should update caret positions and suggestions/commands
    if(e.keyCode === 37 || e.keyCode === 39){
      //#TODO: ARROW KEY EVENTS ARE HELLA BUGGED
      // this.editorEvent(e); //#TODO:bugged doesnt update selection properly;
    }
    if(e.keyCode === 38 || e.keyCode === 40){
      //SCROLL THROUGH SUGGESTIONS
      if(this.suggestions.current.state.active){
        e.preventDefault();
      }
      else{
        //#TODO: ARROW KEY EVENTS ARE HELLA BUGGED
        // this.editorEvent(); //bugged doesnt update selection properly
      }
    }
  }



  editorEvent(e){
    // ================== Load current cell ====================================
    var cur_node = document.getElementById(e.target.id);
    // console.log("current input node:", cur_node);
    var cur_html = cur_node.outerHTML;
    // console.log("current html content of node", cur_html);

    // ================= find currently typed/selected word =======================
    var sel = window.getSelection();
    // console.log("current window selection", sel);
    // console.log("current selection focusOffset", sel.focusOffset, "current selection anchorOffset", sel.anchorOffset);
    console.log("selection range count", sel.rangeCount);
    var range = sel.getRangeAt(0);
    // console.log("range obtained at sel 0", range);
    var cur_word = this.getCurrentWord(range.startOffset+this.state.extraElements, cur_node.innerText);
    console.log("detected-current-word:", cur_word )

    // ================= proccess selections ======================
    if(cur_word !== "" || cur_word !== " "){
      var pos = this.getSuggestionPosition(range, cur_word);
      // console.log("suggestions position should be", pos);
      this.suggestions.current.setState({active:true, input: cur_word, height: pos.y, width: pos.x});
    }
    else{
      this.suggestions.current.setState({active:false});
    }
  }

  getCurrentWord(search_index, text){
    console.log(text)
    console.log(text.replace(new RegExp("<{1}(.)*<{1}/{1}(.)*>{1}"), ""));
    console.log("finding last word in current selection ==== ", text);
    for(var i = search_index-1; i >= 0; i--){
      // console.log("unicode", text.charCodeAt(i), text[i])
      if(text[i] === " " || text[i] === "&nbsp" || text[i] === "\n"){

        return text.slice(i+1,search_index);
      }
    }
    return text;
  }

  getSuggestionPosition(range, cur_word){
    var temp_div = document.createElement("div");
    temp_div.id = "temp";
    range.insertNode(temp_div);

    var pos =  this.getPosition(temp_div);
    removeElement("temp");

    var el = document.getElementById(this.state.current_id);
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);

    var size = getTextWidth(cur_word, fontSize); //this function accounts for all fonts, BUT WE ARENT ABLE CURRENTLY TO SPECIFY THE FONTS

    // console.log("==== calculated size", size, "=====================")
    pos.x = pos.x - size*1.5;
    pos.y = pos.y + 8;
    return pos;

  }

  getPosition(el){
    var xPos = 0;
    var yPos = 0;
    while (el) {
      if (el.tagName === "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }
// ========================= END EDITOR BEHAVIOUR =====================


    // end find currently typed/selected word


  // handleKeyDown(e){
  //   // update keys
  //   if(e.keyCode === 16) this.setState({deleteCellKeys: {16:true,
  //                                   8: this.state.deleteCellKeys[8]}});
  //
  //   if(e.keyCode === 8) this.setState({deleteCellKeys: {16: this.state.deleteCellKeys[16],
  //                                                       8: true}});
  //
  //   //check for triggered events
  //   if(this.state.deleteCellKeys[16] === true &&
  //       this.state.deleteCellKeys[8] === true){
  //         console.log("delete")
  //         const id = this.state.current_id;
  //
  //         var node_to_delete = document.getElementById(
  //                           "editorContent"+ id.toString());
  //         console.log(node_to_delete);
  //         if(node_to_delete !== null && node_to_delete !== undefined) {
  //           node_to_delete.remove();
  //           this.setState({deleteCellKeys: {16:false, 8: false}});
  //         }
  //       }
  // }

  // handleKeyUp(e){
  //   if(e.keyCode === 16) this.setState({deleteCellKeys: {16:false,
  //                                   8: this.state.deleteCellKeys[8]}});
  //
  //   if(e.keyCode === 8) this.setState({deleteCellKeys: {16: this.state.deleteCellKeys[16],
  //                                                       8: false}});
  // }

  // matchWordEvent(e){
  //   const cid = this.state.current_id.toString();
  //   // var id = "editorContent" + cid;
  //   var node = document.getElementById(e.target.id);
  //   var sel = window.getSelection();
  //   // console.log("selection", sel);
  //   // console.log("id", e.target.id);
  //   const caretPos = e.target.id.startsWith("formula")? sel.anchorOffset: sel.focusOffset;
  //   console.log("focusoffset:", sel.focusOffset, "anchorOffset:", sel.anchorOffset);
  //   console.log("offset", caretPos);
  //   console.log("========== OUTER HTML ================", node.outerHTML);
  //   if(node === null || node === undefined){
  //     console.log("text match error");
  //     return;
  //   }
  //   const [exact_match, interpreted_match] = this.getLastWord(node.innerText, caretPos);
  //   if(interpreted_match === null || exact_match === null || interpreted_match === undefined || exact_match === undefined) console.log("undefined behaviour for word match event");
  //   else {
  //     console.log("word", interpreted_match);
  //     console.log("starts with complicated character", !(isLetter(interpreted_match.charAt(0))) );
  //     for(var i = 0; i < interpreted_match.length; i++){
  //       console.log("char:",interpreted_match[i], "unicode:", interpreted_match.charCodeAt(i));;
  //     }
  //     console.log("is word === integral?", interpreted_match === "integral");
  //     if(interpreted_match === "integral"){
  //       console.log("matched to existing command")
  //       document.getElementById(e.target.id).innerHTML
  //     = node.innerHTML.replace("integral", '<span contentEditable = "false" id = "symbol'+ cid +'">&#8747;<div id = "formula'+ this.state.fid.toString()+ + cid + '" contentEditable = "true"/> </span>');
  //     const new_fid = this.state.fid + 1;
  //     this.setState({fid: new_fid});
  //     var formulaToFocus = document.getElementById("formula" + (new_fid-1).toString()+ cid);
  //     formulaToFocus.focus();
  //     formulaToFocus.addEventListener("onkeypress", this.handleFormulaKey, false);
  //
  //     // this.setState({prevCaretPos: caretPos+1});
  //     }
  //     if(interpreted_match === "fraction"){
  //       console.log("matched to existing command: fraction");
  //       const current_fid = this.state.fid;
  //
  //       document.getElementById(e.target.id).innerHTML = node.innerHTML.replace("fraction", '<div className="frac"'+cid+'><span className = "fractop"> <div contentEditable = "true" className = "formula'+current_fid.toString()+cid+'"> 1 </div></span><span className="fracsymbol">/</span><span className="fracbottom"> <div contentEditable = "true" className = "formula'+(current_fid+1).toString()+cid+'"> 2 </div></span></div>');
  //       const new_fid = this.state.fid + 2;
  //       this.setState({fid: new_fid});
  //       var formulaToFocus = document.getElementById("formula" + (new_fid-1).toString()+ cid);
  //       // var formulaToFocus = document.getElementById("formula" + (new_fid-2).toString()+ cid);
  //       // formulaToFocus.focus();
  //     }
  //   };
  // }

  // handleFormulaKey(e){
  //   console.log("key pressed inside formula");
  // }
  //
  // getLastWord(full_text, last_index){
  //   console.log("=======================================")
  //   console.log("full_text length", full_text.length,"last index", last_index);
  //   for(var i = 0; i < full_text.length; i++){
  //     console.log("char:", full_text[i], "unicode:", full_text.charCodeAt(i));
  //   }
  //   console.log("full focus text", full_text);
  //   for(var i = full_text.length; i >= full_text.length - last_index; i--){
  //     if(full_text[i-1] === " " || last_index - i > COMMAND_LIMIT || i === 0){
  //       const exact_match = full_text.slice(i, full_text.length);
  //       console.log("exact_match", exact_match);
  //       var interpreted_match = exact_match.replace(/[\W_]+/g, "");
  //       return [exact_match, interpreted_match];
  //     }
  //   }
  //   return full_text;
  // }




  render(){
    return (
      <div>
        <Toolbar />
        <div
          className = "editorContainer"
          id = "editorContainer">
              <div className = "editorContent"
              id = {"editorContent_"+this.state.initial_id}
              contentEditable='true'
              onClick = {(e) => this.setID(e.target.id)}
              onInput = {(e) => this.editorEvent(e)}
              onKeyDown = {(e) => this.checkEditorKey(e)}>
              </div>
        <Suggestions parent = {this} ref = {this.suggestions}/>
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

        <br></br>


      </div>
    )
  }
}

export default Editor;

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function removeElement(id){
  var elem = document.getElementById(id);
  // console.log("remove element", elem);
  if(elem === null) return;
  // console.log("removal element's parent", elem.parentNode);
  return elem.parentNode.removeChild(elem);
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
