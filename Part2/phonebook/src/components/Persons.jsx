import Person from "./Person";

export default function Persons({persons, filter, deletePerson}){
    const filtered= filter.length > 0? persons.filter(obj =>obj.name.toLowerCase().includes(filter.toLowerCase())): persons
    return (
      <div>
        {filtered.map(obj=> <Person key={obj.name} obj={obj} deletePerson={deletePerson}/> ) }
      </div>
    )
}