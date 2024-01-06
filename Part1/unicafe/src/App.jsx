import { useState } from 'react'

const Button=({text,onClick})=>{
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Feedback=({text,value})=>{
  return(
    <>
    <p>{text} {value}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback=(feedback)=>{
    if(feedback==="good"){
      return ()=>setGood(good+1)
    }
    else if(feedback==="neutral"){
      return ()=> setNeutral(neutral+1)
    }
    else if(feedback==="bad"){
      return ()=>setBad(bad+1)
    }
  }

  const all=good+neutral+bad
  const avarage=(good-bad)/all
  const positive=(good/all)*100


  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={giveFeedback("good")}/>
      <Button text="neutral" onClick={giveFeedback("neutral")}/>
      <Button text="bad" onClick={giveFeedback("bad")}/>
      <h1>statistics</h1>
      <Feedback text={"good"} value={good} />
      <Feedback text={"neutral"} value={neutral} />
      <Feedback text={"bad"} value={bad} />
      <p>all {all}</p>
      <p>avarage {avarage}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App