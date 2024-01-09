const Header = ({ courseName }) => <h1>{courseName}</h1>

const Total = ({ sum }) => <p><b>total of {sum} excercises</b></p>


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
    <>{parts.map((part)=>
      <Part part={part} key={part.id}/>
      )}
    </>


const Course=({course})=>{
return(
  <>
  <Header courseName={course.name}/>
  <Content parts={course.parts}/>
  <Total sum={course.parts.reduce((sum,part)=>sum+part.exercises,0)}/>
  </>
)
}

const App = () => {
  const course = {
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
        name: 'Rendering a collection, modules',
        exercises: 5,
        id: 4
      }

    ]
  }

  return <Course course={course} />
}

export default App