import { useState } from "react"
import Country from "./Country"

export default function Countries({countries, filter}){
    const [country, setCountry] = useState(null)
    const filtered =countries.filter(country => country.name.common.toLowerCase().includes(filter?.toLowerCase()))
    if (filtered.length === 1 && !country){
        setCountry(filtered[0])
    }
    const showCountry = (countryObj)=>{
        setCountry(countryObj)
    }
    return (
        <>
        {country?(
            <Country country={country}/>
        ) : (
            <div> {filtered.length < 10?(
                <>
                    {filtered.map((country)=> {
                        return <div key={country.name.common}>
                            <p >{country.name.common}</p>
                            <button onClick={()=> showCountry(country)}>Show</button>
                        </div >
                        })}
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