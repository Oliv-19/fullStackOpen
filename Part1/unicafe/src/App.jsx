import { useState } from 'react'

function Statistics({good, neutral, bad}){
  const all= good+neutral+bad

  const average= (good-bad)/all
  const positive= (good/all)*100


  return (
    <div>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>

    </div>

  )
}
function Button({type, setFunc, state}){
  const handleClick=()=>setFunc(state+ 1 )

  return (
    <button onClick={handleClick}>{type}</button>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button type='good' setFunc={setGood} state={good}/>
      <Button type='neutral' setFunc={setNeutral} state={neutral}/>
      <Button type='bad' setFunc={setBad} state={bad}/>

      <h1>statistics</h1>
      <Statistics  good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
