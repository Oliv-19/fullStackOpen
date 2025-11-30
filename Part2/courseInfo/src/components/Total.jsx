export default function Total({parts}){
  return (
    <p>total of {parts.reduce((prev, curr)=>{
        return prev + curr.exercises
    }, 0)} exercises </p>
  )
}