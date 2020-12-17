import React from "react";
import "./Suggestions.css";

class Suggestions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      input: " ",
    }
  }

  matchAlgorithm(input, string){
    return string.startsWith(input);
  }


  render(){
    return(
      <div className = "dynamicSuggestions" hidden = {!this.state.active}>
        <span className = "suggestionsEL" hidden = {this.state.input !== "integral"}>&#8747;</span>
        <br></br>
        <span className = "suggestionsEL" hidden = {this.state.input !=="integral"}>&#8747;<sup>n</sup><sub>i = 1</sub></span>
      </div>
    )
  }
}

export default Suggestions;
