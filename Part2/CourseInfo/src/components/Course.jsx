const Header = ({ courseName }) => <h2>{courseName}</h2>

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

export default Course