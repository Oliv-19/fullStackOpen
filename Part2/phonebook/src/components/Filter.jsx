export default function Filter({filterPersons}){
  return (
    <div>
      filter shown with: 
      <input type="text" onChange={filterPersons} />
    </div>
  )
}