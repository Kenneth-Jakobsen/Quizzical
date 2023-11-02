import React from "react"
import nanoid from "./nanoid"



function decodeHtmlEntities(html) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
}


export default function Question(props){
        const decodedQuestion = decodeHtmlEntities(props.question)
        const optionsArray=props.options.map(option => decodeHtmlEntities(option))
        const optionsElement = optionsArray.map((answer) => {
        const id = nanoid(); 
    return (
            <label key={answer} htmlFor={id}>
                {answer}
                <input
                type="radio"
                id={id}
                name={props.id}
                onChange={() => props.handleClick(props.id)}
                />
            </label>
    );
  });
       
    
        
        return (
            
        <div className="quiz--div">
            <h2>{decodedQuestion}</h2>
               <div className="options--div">
                    {optionsElement}
               </div>
        </div>
    )
}