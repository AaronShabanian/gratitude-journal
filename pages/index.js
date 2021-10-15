import Head from 'next/head'

import React, { useEffect, useState } from "react";
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
export default function Home() {
  const [user, setUser] =useState({
    "name": "Aaron",
    "email": "Shabanian@chapman.edu",
  })
  const [gratitudes, setGratitudes] =useState(
    ["Choochoo", "dog"]
  )

  const [hasSubmittedToday, setSubmittedToday]= useState(
    false
  )
  const addGratitude = (entry) =>{
    let newGratitudes=[...gratitudes, entry]
    setGratitudes(newGratitudes)
    setSubmittedToday(true)
  }
 
  return (
    <div className="bg-gray-700 min-h-screen min-w-screen">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
        <Greeting user={user} gratitudes={gratitudes} hasSubmittedToday={hasSubmittedToday}></Greeting>
        {
        !hasSubmittedToday  && <Input handleSubmit={addGratitude}/>
        }
        
          {
            /*
            Making an if loop to decide if gratitudes should be shown or not
            */
            (gratitudes.length>0 ) && (
              <p className="text-white text-2xl"> Previously you were grateful for <span className="font-bold"> 
                <History gratitudes = {gratitudes.map(g => " "+g).toString()} /> 
                </span> </p>

            )
          }
          </main>
    </div>
  )
}
