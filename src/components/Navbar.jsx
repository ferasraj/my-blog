import { twMerge } from "tailwind-merge";
import { CircleX } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import Images from "./Images";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={twMerge(
        "w-full h-16 md:h-20 flex items-center justify-between"
      )}
    >
      {/* LOGO */}
      <Link to="/" className={"flex items-center gap-4 text-2xl font-bold"}>
        <Images src="logo.png" alt="RajLog" w={32} h={32} />
        <span>RajDev</span>
      </Link>
      {/* Mobile Menu */}
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu-list"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <CircleX size={28} strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <AlignJustify size={28} strokeWidth={2.5} aria-hidden="true" />
        )}
      </button>
      {/* Moble Link List */}
      <nav
        id="mobile-menu-list"
        className={twMerge(
          "w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center",
          "absolute top-16  bg-main transition-all ease-in-out duration-300",
          open ? "left-0" : "left-full",
          "gap-8 font-medium text-lg"
        )}
      >
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link
            to="/login"
            className={twMerge(
              "py-2 px-4 rounded-3xl bg-blue-800 text-white cursor-pointer"
            )}
          >
            Login 👋
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
      {/* Desktop Menu */}
      <nav
        className={twMerge(
          "hidden md:flex items-center gap-8 xl:gap-12 font-medium"
        )}
      >
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>

        <SignedOut>
          <Link
            to="/login"
            className={twMerge(
              "py-2 px-4 rounded-3xl bg-blue-800 text-white cursor-pointer"
            )}
          >
            Login 👋
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
