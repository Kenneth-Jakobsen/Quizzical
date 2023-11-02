import React from "react"
import Question from "./Question"
import nanoid from "./nanoid"


export default function App(){
                
const [quiz, setQuiz] = React.useState([])  
const [newgame, setNewGame] = React.useState(false)


 function insertAtRandomIndex(arr, item) {
        const copiedArr = [...arr]
        const randomIndex = Math.floor(Math.random() * (copiedArr.length + 1));
        copiedArr.splice(randomIndex, 0, item);
        return copiedArr
    }

React.useEffect(() => {
  fetch("https://opentdb.com/api.php?amount=5")
    .then((res) => res.json())
    .then((data) => {
      const quizData = data.results.map((item) => {
        const incorrectAnswersArray = [...item.incorrect_answers];
        const correctAnswer = item.correct_answer;
        const allAnswersArray = insertAtRandomIndex(incorrectAnswersArray, correctAnswer);
        return {
          question: item.question,
          correct: correctAnswer,
          incorrect: incorrectAnswersArray,
          options: allAnswersArray,
          selected: "",
          id:nanoid()
        };
      });
      setQuiz(quizData);
    });
}, [newgame])

  


function selectAnswer(event,id){
     const {name, value,} = event.target
     console.log(name,value)
        setQuiz(oldData => oldData.map(elem=> {
       return elem.id===id ? {...elem,  selected:value} : elem
   }))
}



const quizElements = quiz.map((elem) => 
    <Question
    key={elem.id}
    id={elem.id}
    selected={elem.selected}
    question={elem.question}
    options={elem.options}
    handleClick={() => selectAnswer(event,elem.id)} 
     />
    )

function checkAnswers (){
    const answers=quiz.filter(elem => elem.correct===elem.selected)
    console.log(answers)
}


return (
    <div className="main--div">
        {quizElements}
        <div>
            <button onClick={checkAnswers}>Check answers</button>
        </div>
    </div>
)

}