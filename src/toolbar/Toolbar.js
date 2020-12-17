import React from "react";
import "./Toolbar.css";

class Toolbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.setState({height: window.innerHeight});
  }

  componentDidUpdate(){

  }

  runcommand(e,cmd){
    e.preventDefault();
    document.execCommand(cmd, false, null);
  }

  runCustomCommand(e, tag){
    e.preventDefault();

  }

  render(){
    return (
      <div className = "toolbar">
        <ul className = "tool-list">
          <li className = "tool">
          <button
              onMouseDown = {(e) => e.preventDefault()}
              data-command='justifyLeft'
              className="tool--btn"
              onClick = {(e) => this.runcommand(e,'justifyLeft')}>
              Justify Left
          </button>
          </li>
          <li className="tool">
			      <button
				    className="tool--btn"
            onClick = {(e) => this.runcommand(e,'justifyCenter')}
            onMouseDown = {(e) => e.preventDefault()}>
            Justify Center
			     </button>
		      </li>

          <li className="tool">
			      <button
				    type="button"
				    data-command='justifyRight'
				    className="tool--btn"
            onClick = {(e) => this.runcommand(e,'justifyRight')}
            onMouseDown = {(e) => e.preventDefault()}>
            Justify Right
			     </button>
		      </li>

          <li className = "tool">
            <button
            type = "button"
            data-command = "bold"
            className = "tool--btn"
            onClick = {(e) => this.runcommand(e,'bold')}
            onMouseDown = {(e) => e.preventDefault()}>
            Bold
            </button>
          </li>

          <li className = "tool">
            <button
            type = "button"
            data-command = "italic"
            className = "tool--btn"
            onClick = {(e) => this.runcommand(e,'italic')}
            onMouseDown = {(e) => e.preventDefault()}>
            Italic
            </button>
          </li>

          <li className = "tool">
            <button
            type = "button"
            data-command = "underline"
            className = "tool--btn"
            onClick = {(e) => this.runcommand(e,'underline')}
            onMouseDown = {(e) => e.preventDefault()}>
            Underline
            </button>
          </li>
          <li className = "tool">
            <button
            type = "button"
            data-command = "insertOrderedList"
            className = "tool--btn"
            onClick = {(e) => this.runcommand(e,"insertOrderedList")}
            onMouseDown = {(e) => e.preventDefault()}>
            Insert ordered list
            </button>
          </li>
          <li className = "tool">
            <button
            type = "button"
            data-command = "insertUnorderedList"
            className = "tool--btn"
            onClick = {(e) => this.runcommand(e,"insertUnorderedList")}
            onMouseDown = {(e) => e.preventDefault()}>
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
