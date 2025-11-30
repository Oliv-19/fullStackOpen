import Person from "./Person";

export default function Persons({persons, filter}){
    const filtered= persons.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase()))
    return (
      <div>
        {filtered.map(obj=> <Person key={obj.name} obj={obj} /> ) }
      </div>
    )
}