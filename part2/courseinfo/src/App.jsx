const Course = ({ course }) => { 
  console.log(course)

  const sum = course.parts.reduce((a, b) => a + b.exercises, 0)
  console.log(sum);
  
  return (
    <div>
      <h1>{course.name}</h1>
        {course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>  
        )}
      <b>total of {sum} exercises</b>
    </div>
  )
}

const App = () => {
  const courses = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

return (
  <div>
    {courses.map(course =>(
      <Course key={course.id} course={course} />
    ))}
  </div>
)



}

export default App