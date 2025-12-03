export default function Country({country}){
    return(
        <div>
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital : {country.capital}</p>
                <p>Area: {country.area} </p>
            </div>
            <div>
                <h1>Languages</h1>
                <ul>
                    {Object.values(country.languages).map(lan=> <li key={lan}>{lan}</li>)}
                </ul>
            </div>
            <img src={country.flags.svg} alt={country.flags.alt} width='300px'/>
        </div>
    )
}