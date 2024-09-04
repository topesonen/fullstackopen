import { useState } from 'react'

const Header = ({header}) => <h2>{header}</h2>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(() => {
    const initial = {}
    for (let i =0; i < anecdotes.length; i++) {
      initial[i] = 0
    }
    return initial
  })

  const randomize = () => {
    const randomIndex = getRandomInt(anecdotes.length)
    console.log(getRandomInt(randomIndex));
    
    setSelected(randomIndex)
  }

  const vote = () => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [selected]: prevVotes[selected] + 1
    }));
  }
     
  const getMostVoted = () => {
    let maxVotes = 0;
    let indexOfMax = 0;

    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > maxVotes) {
        maxVotes = votes[i];
        indexOfMax = i
      }
    }
    
    return{
      anecdote: anecdotes[indexOfMax],
      votes: maxVotes
    }
  }

  const mostVotedAnecdote = getMostVoted();
  
  console.log(votes)

  return (
    <div>
      <Header header="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={randomize} text="next anecdote" />
      <Header header="Anecdote with most votes"/>
      <p>{mostVotedAnecdote.anecdote}</p>
      <p>has {mostVotedAnecdote.votes} votes</p>
    </div>
  )
}

export default App