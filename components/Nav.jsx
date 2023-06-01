'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
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
        </div>) : (<></>)}
      </div>
    </nav >
  )
}

export default Nav