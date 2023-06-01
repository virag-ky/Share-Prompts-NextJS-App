'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setTheProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setTheProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 felx-center" href='/'>
        <Image src='/assets/images/logo.svg' alt="Promptopia logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (<div className="flex gap-3 md:gap-5">
          <Link href='/create-prompt' className="black_btn hover:bg-white hover:text-black">Create Post</Link>
          <button type="button" onClick={signOut} className="outline_btn hover:bg-black hover:text-white ">Sign Out</button>
          <Link href='/profile'>
            <Image src='/assets/images/logo.svg' className="rounded-full" alt="profile" width={37} height={37}></Image>
          </Link>
        </div>) : (<>
          {providers && Object.values(providers).map((provider) => (
            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
          ))}
        </>)}
      </div>
    </nav >
  )
}

export default Nav