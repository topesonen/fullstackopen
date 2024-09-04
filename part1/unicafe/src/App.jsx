import { useState } from 'react'


const Header = ({header}) => <h2>{header}</h2>


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, allReviews}) =>{

  const all = allReviews.length
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  const sum = allReviews.reduce((a, b) => a + b, 0)

  const avg = (sum / all) || 0
  const pos = (good / all * 100) || 0 

  console.log({good}) 
  console.log({pos})
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg.toFixed(1)} />
        <StatisticLine text="positive" value={pos.toFixed(1) + '%'} />
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