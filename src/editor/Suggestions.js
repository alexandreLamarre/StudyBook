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
        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "integral"))? "none": "block"}}>&#8747;</div>
        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "integral"))? "none": "block"}}>&#8747;<sup>n</sup><sub>i = 1</sub></div>
        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "fraction"))? "none": "block"}}><span class="top">a</span><div className = "fracbar"></div><span class="bottom">b</span></div>
      </div>
    )
  }
}

export default Suggestions;
