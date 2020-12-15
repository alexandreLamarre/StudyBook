import React from "react";
import "./Toolbar.css";

class Toolbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  runcommand(cmd){
    document.execCommand(cmd, false, null)
  }


  render(){
    return (
      <div className = "toolbar">
        <ul className = "tool-list">
          <li className = "tool">
          <button
              type="button"
              data-command='justifyLeft'
              className="tool--btn"
              onClick = {(e) => this.runcommand('justifyLeft')}>
              Justify Left
          </button>
          </li>
          <li className="tool">
			      <button
				    type="button"
				    data-command='justifyCenter'
				    className="tool--btn"
            onClick = {(e) => this.runcommand('justifyCenter')}>
            Justify Center
			     </button>
		      </li>

          <li className="tool">
			      <button
				    type="button"
				    data-command='justifyRight'
				    className="tool--btn"
            onClick = {(e) => this.runcommand('justifyRight')}>
            Justify Right
			     </button>
		      </li>

          <li className = "tool">
            <button
            type = "button"
            data-command = "bold"
            className = "tool--btn"
            onClick = {(e) => this.runcommand('bold')}>
            Bold
            </button>
          </li>

          <li className = "tool">
            <button
            type = "button"
            data-command = "italic"
            className = "tool--btn"
            onClick = {(e) => this.runcommand('italic')}>
            Italic
            </button>
          </li>

          <li className = "tool">
            <button
            type = "button"
            data-command = "underline"
            className = "tool--btn"
            onClick = {(e) => this.runcommand('underline')}>
            Underline
            </button>
          </li>
          <li className = "tool">
            <button
            type = "button"
            data-command = "insertOrderedList"
            className = "tool--btn"
            onClick = {(e) => this.runcommand("insertOrderedList")}>
            Insert ordered list
            </button>
          </li>
          <li className = "tool">
            <button
            type = "button"
            data-command = "insertUnorderedList"
            className = "tool--btn"
            onClick = {(e) => this.runcommand("insertUnorderedList")}>
            insertUnorderedList
            </button>
          </li>
          {/*
          <li className = "tool">
            <button
            type = "button"
            data-command = "createlink"
            className = "tool--btn"
            >
            Create Link
            </button>
          </li>
          */}
        </ul>
      </div>
    )
  }
}

export default Toolbar;
