import fetcher from '@/components/fetcher'
import { getToken } from '@/lib'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const Dashboard = async () => {
    const header = getToken()
    const data = await fetcher("users", header)
  // console.log("dashboard", data);

  return (
    <div>
        <h2>Dashboard</h2>
        <Link href={"/"} >Home</Link>
        <pre>{header}</pre>
        <pre>{data[0].name}</pre>
        <pre>{headers().get("accessToken")}</pre>
    </div>
  )
}

export default Dashboard