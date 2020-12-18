import React from "react";
import "./Suggestions.css";
import {mathRenderedElement} from "./MathSheet/mathExpr";

class Suggestions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      input: " ",
      height: 0,
      width: 0,
    }
    this.parent = this.props.parent;
  }

  componentDidUpdate(){
    var this_node = document.getElementById("dynamicSuggestions");
    console.log(this_node);

    //#TODO: here we should update the state with the elements whose display is not
    //none so we can scroll through them with the arrow keys and active them with the enter key
  }

  matchAlgorithm(input, string){
    return string.startsWith(input) && input !== "";
  }

  createMathElement(name){
    var cur_id = this.parent.state.current_id;
    console.log("inserting into id", cur_id);
    const replace_str = this.state.input;
    console.log("replacing '", replace_str,"' with...", name);
    const [symbol, focus_id] =  mathRenderedElement(name, this.parent.findElementId(cur_id));
    console.log("should become ", symbol);
    var node = document.getElementById(cur_id);
    var new_inner_html = node.innerHTML;
    new_inner_html = new_inner_html.replace(replace_str, symbol);
    node.innerHTML = new_inner_html;
    this.parent.setState({
      current_id: focus_id,
      extraElements: this.parent.state.extraElements+2});
    var focus_node = document.getElementById(focus_id);
    focus_node.focus();
    this.setState({active: false})


    // new_text.replace(replace_str, mathRenderedElement(replace_str))
  }


  render(){
    return(
      <div id = "dynamicSuggestions" className = "dynamicSuggestions" hidden = {!this.state.active} style={{top:this.state.height, left:this.state.width}}>
        <div id= "indefinite integral"
        className = "suggestionsEL"
        style={{display: !(this.matchAlgorithm(this.state.input, "integral"))? "none": "block"}}
        onClick = {(e) => this.createMathElement(e.target.id)}>
          &#8747;
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "integral"))? "none": "block"}}>
            &#8747;<span class='supsub'><sup class='superscript'>n</sup><sub class='subscript'>i=1</sub></span>
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "fraction"))? "none": "block"}}>
          <div className = "fraction"><span class="top">a</span><div className = "fracbar"></div><span class="bottom">b</span></div>
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "function"))? "none": "block"}}>
        f(x) = x<sup>2</sup>
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "function"))? "none": "block"}}>
        &sigma; : X &#8594; Y, &sigma;(x) = y
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "graph"))? "none": "block"}}>
        G = (V, E)
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "graph"))? "none": "block"}}>
        G = (V, E), V = &#123; &#125; , E = &#123; &#125;
        </div>

        <div className = "suggestionsEL" style={{display: !(this.matchAlgorithm(this.state.input, "vector"))? "none": "block"}}>
        V<span>&#8407</span>;
        </div>
      </div>
    )
  }
}

export default Suggestions;
