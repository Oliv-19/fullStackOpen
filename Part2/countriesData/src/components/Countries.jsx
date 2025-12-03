import Country from "./Country"

export default function Countries({countries, filter}){
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter?.toLowerCase()))
    return (
        <>
        {filtered.length === 1 ?(
                <Country country={filtered[0]}/>
            ):(
                <div> {filtered.length < 10?(
                    <>
                        {filtered.map((country)=> <p key={country.name.common}>{country.name.common}</p>)}
                    </>
                    ):(
                        <>
                        <p>Too many matches, specify another filter</p>
                    </>
                    )
                }
                </div>
            )
        }
    </>
    )
}