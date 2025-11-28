import { useState } from 'react'

function Statistics({type, totalNumber}){
  return (
    <p>{type} {totalNumber}</p>
  )
}
function Button({type, setFunc,num}){
  const handleClick=()=>setFunc(num +1)

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
      <Button type='good' setFunc={setGood} num={good}/>
      <Button type='neutral' setFunc={setNeutral} num={neutral}/>
      <Button type='bad' setFunc={setBad} num={bad}/>

      <h1>statistics</h1>
      <Statistics type='good' totalNumber={good}/>
      <Statistics type='neutral' totalNumber={neutral}/>
      <Statistics type='bad' totalNumber={bad}/>

    </div>
  )
}

export default App
