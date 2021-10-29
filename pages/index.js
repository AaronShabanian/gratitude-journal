import Head from 'next/head'

import React, { useEffect, useState } from "react";
import GratitudeApp from '../components/GratitudeApp';
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import {supabase} from "../utils/supabaseClient"
import {Auth} from '@supabase/ui'
export default function Home() {
 
  const { user } = Auth.useUser()
  return (
    <div className="bg-gray-700 min-h-screen min-w-screen">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
        {
          user ? ( <div>
          
            <GratitudeApp user={user}></GratitudeApp>
            <button onClick={ async() => {let {error}= await supabase.auth.signOut()}}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full">Logout</button>

            </div>
          ):(
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"/>
          )
        }
          </main>
    </div>
  )
}
