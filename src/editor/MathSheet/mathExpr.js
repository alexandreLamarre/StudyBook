import { v4 as uuidv4 } from 'uuid'

export function mathRenderedElement(identifier_string, id){
  const s = identifier_string;
  if(s === "indefinite integral") return renderIndefiniteIntegral(id);

}

function renderIndefiniteIntegral(id){
  const unique_id = uuidv4();
  return [`<div id ="symbol_${unique_id}_${id}" contentEditable = "false">
            &#8747; <div contentEditable = "true"
            className ="formula" id = "formula_${unique_id}_${id}"> </div>
          </div>`, `formula_${unique_id}_${id}`]
}
