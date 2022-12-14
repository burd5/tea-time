import React, { useState } from 'react'
import Head from '../components/Head'

export default function Profile() {

  const [user, setUser] = useState('')

  return (
    <div>
        <Head />
        <h1 className="text-4xl text-center">Welcome {user}!</h1>
    </div>
  )
}
