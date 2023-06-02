"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setTheProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setTheProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 felx-center" href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text max-sm:hidden">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn hover:bg-white hover:text-black"
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="outline_btn hover:bg-black hover:text-white "
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                className="rounded-full"
                alt="profile"
                width={37}
                height={37}
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn  hover:bg-white hover:text-black"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link hover:text-gray-500"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link hover:text-gray-500"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn  hover:bg-white hover:text-black"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn  hover:bg-white hover:text-black"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
