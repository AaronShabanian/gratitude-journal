import Head from 'next/head'

import React, { useEffect, useState } from "react";
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import {supabase} from "../utils/supabaseClient"
export default function GratitudeApp({ user}) {

  const [gratitudes, setGratitudes] =useState(
    []
  )

  const [hasSubmittedToday, setSubmittedToday]= useState(
    false
  )

  const [loading, setLoading]= useState(true)
  const[error, setError]=useState(null)

  useEffect(()=> {
    // run the fetchGratitudes() function
    // after initial render of the app
    // so we haveaccess to the logged in user
    fetchGratitudes()

  }, [loading])

  const fetchGratitudes = async () => {
    // get the gratitudes data from supabase 
    //set the value of gratitude state to that data
    let { data: gratitudes, error } = await supabase
    .from('gratitudes')
    .select('entry, date_insert_ts')
    let mostRecentRecord = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
    let currentDate=new Date().getTime()
    if(mostRecentRecord-currentDate>86400000){
      setSubmittedToday(false)
    }
    else{
      setSubmittedToday(true)
    }
    if(!error){
      /*  */
      let mostRecentRecord = new Date(gratitudes.slice(-1)[0].date_insert_ts)
      setGratitudes(gratitudes)
      setLoading(false)
    } else{
      setError(error)
      setLoading(false)
    }
  }

  const addGratitude = async (entry) =>{
    const { data, error } = await supabase
    .from('gratitudes')
    .insert([
    { id: user.id, entry: entry}
    ])
    setLoading(true)
    if(error){
      console.log(error)
      setError(error)
    }
    else{
      setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null}])
      setSubmittedToday(true)
    }
    setLoading(false)
  }

  if(loading){
    return <p> Loading... </p>
  }

  if(error){
    return <p>{error}</p>
  }
  /*Everything went as expected*/ 
  return (
    <div className="bg-gray-700 min-w-screen">
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
                <History gratitudes = {gratitudes} /> 
                </span> </p>

            )
          }
          </main>
    </div>
  )
}
