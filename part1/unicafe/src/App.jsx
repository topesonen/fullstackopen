import { useState } from 'react'


const Header = ({header}) => <h2>{header}</h2>


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, allReviews}) =>{

  const sum = allReviews.reduce((a, b) => a + b, 0)
  const all = allReviews.length
  const avg = (sum / all) || 0
  const pos = (good / all * 100) || 0 

  console.log({good}) 
  console.log({pos})
  return (
    <table>
      <tbody>
        <tr><td>good</td><td>{good}</td></tr>
        <tr><td>neutral</td><td>{neutral}</td></tr>
        <tr><td>bad</td><td>{bad}</td></tr>
        <tr><td>all</td><td>{all}</td></tr>
        <tr><td>average</td><td>{avg.toFixed(1)}</td></tr>
        <tr><td>positive</td><td>{pos.toFixed(1)}%</td></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAll] = useState([])
  console.log(allReviews)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allReviews.concat(1))
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allReviews.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allReviews.concat(-1))
  }


  return (
    <div>
      <Header header="give feedback"/>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header header="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} allReviews={allReviews}/>
    </div>
  )
}

export default App