import React from 'react'
import Head from '../components/Head'
import {useUserStore} from './useStore'

export default function Profile() {

  const setUser = useUserStore(state => state.setUser)

  return (
    <div>
        <Head />
    </div>
  )
}
