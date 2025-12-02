import Person from "./Person";

export default function Persons({persons, filter}){
    const filtered= persons.filter(obj => filter.length > 0? obj.name.toLowerCase().includes(filter.toLowerCase()): obj)
    return (
      <div>
        {filtered.map(obj=> <Person key={obj.name} obj={obj} /> ) }
      </div>
    )
}