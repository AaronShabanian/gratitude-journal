import React, { useEffect, useState } from "react";
export default function Input({handleSubmit}){
    const[value, setInput] = useState("")

    let submitForm = e=> {
        e.preventDefault()
        handleSubmit(value)
        setInput("")
    }
    return (
        <form onSubmit={submitForm}>
            <input type="text" value={value} onChange={e =>setInput(e.target.value)} 
            className="rounded px-3 py-2">

            </input>
            <button type="submit" className="bg-pink-300 rounded px-12 py-2"> Save </button>
        </form>
    )
}