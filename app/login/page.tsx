"use client"

import React from 'react'
import { loginAction, logoutAction } from '@/action/loginAction';
import ClientSignedIn from '@/components/ClientSignedIn';
import ClientSignedOut from '@/components/ClientSignedOut';


const Login = () => {
  return (
    <div>
      <form
        action={loginAction}
      >
        <input type="email" placeholder="Email" />
        <br />
        <br />
        <ClientSignedOut>
         <button type="submit">Login</button>
        </ClientSignedOut>
      </form>
      <form
        action={logoutAction}
      >
        <ClientSignedIn>
         <button type="submit">Logout</button>
        </ClientSignedIn>
      </form>
    </div>
  )
}

export default Login