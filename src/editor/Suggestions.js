import React from "react";
import "./Suggestions.css";

class Suggestions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      input: " ",
      height: 0,
      width: 0,
    }
  }

  matchAlgorithm(input, string){
    return string.startsWith(input) && input !== "";
  }


  render(){
    return(
      <div className = "dynamicSuggestions" hidden = {!this.state.active} style={{top:this.state.height, left:this.state.width}}>
        <span className = "suggestionsEL" hidden = {!(this.matchAlgorithm(this.state.input, "integral"))}>&#8747;</span>
        <br></br>
        <span className = "suggestionsEL" hidden = {!(this.matchAlgorithm(this.state.input, "integral"))}>&#8747;<sup>n</sup><sub>i = 1</sub></span>
        <br></br>
        <span className = "suggestionsEL" hidden = {!(this.matchAlgorithm(this.state.input, "fraction"))}><div class="fraction"><span class="top">a</span><span class="bottom">b</span></div>
        </span>
      </div>
    )
  }
}

export default Suggestions;
