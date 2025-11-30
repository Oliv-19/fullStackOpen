export default function PersonForm(props){
    return (
      <form onSubmit={props.handleSubmit}>
        <h2>Add a new</h2>
        <div>
          name: <input name='name' value={props.newName} onChange={props.handleNameInput}/>
        </div>
        <div>
          number: <input name='number' value={props.newNumber} onChange={props.handleNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}