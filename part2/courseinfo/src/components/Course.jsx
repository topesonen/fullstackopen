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

export default Course