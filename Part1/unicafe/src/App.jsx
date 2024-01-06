import { useState } from 'react'

const Button=({text,onClick})=>{
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}


const Statistics =({good,neutral,bad,all,avarage,positive})=>{
  return(
    <>
    <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>avarage {avarage}</p>
      <p>positive {positive}%</p>
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avarage={avarage} positive={positive}/>
    </div>
  )
}

export default App