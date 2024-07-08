import { getAuthStatus } from '@/lib'
import React from 'react'

const SignedOut = ({ children }: { children: React.ReactNode }) => {
    const isSignedOut = getAuthStatus();
    if (!isSignedOut) return children;
    return null;
}

export default SignedOut