import React, { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)

  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => setBad(bad + 1) 

  return (
    <div>
    <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <StatisticsArray good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = (props) => {

if (props.good + props.neutral + props.bad === 0)

return(
  <div>
    <h1>No feedback given</h1>
  </div>
)

return(
  <div>
    <h1>statistics</h1>
      <StatisticsLine text="good" value={props.good}/>
      <StatisticsLine text="neutral" value={props.neutral}/>
      <StatisticsLine text="bad" value={props.bad}/>
      <StatisticsLine text="all" value={props.good+props.neutral+props.bad}/>
      <StatisticsLine text="average" value={(props.good * 1 + props.neutral * 0 + props.bad * -1) / (props.good + props.neutral + props.bad)}/>
      <StatisticsLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100} sign="%"/> 
  </div>
  )
}

const Button = ({handleClick, text}) => {

  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const StatisticsLine = (props) => {

  return(
    <p>{props.text} {props.value} {props.sign}</p>
  )
}

const StatisticsArray = (props) => {

  if (props.good + props.neutral + props.bad === 0)
  
  return(
    <div>
      <h1>No feedback given</h1>
    </div>
  )

  return(

    <div>
      <h1>statistics</h1>
        <table>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.good+props.neutral+props.bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(props.good * 1 + props.neutral * 0 + props.bad * -1) / (props.good + props.neutral + props.bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{props.good / (props.good + props.neutral + props.bad) * 100} %</td>
          </tr>
        </table>
    </div>
  )
}
    
export default App