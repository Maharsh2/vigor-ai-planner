import React from "react";
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { UserButton } from "@neondatabase/neon-js/auth/react";

const Navbar = () => {
  const user = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-(--color-border) bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-(--color-foreground)"
        >
          <Dumbbell className="w-6 h-6 text-(--color-accent)" />
          <span className="font-semibold text-lg">VigorAi</span>
        </Link>

        <nav>
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="hover:bg-(--color-accent-hover) hover:text(--color-foreground) px-5 font-semibold transition-all duration-150 ease-out" >
                <Link to="/profile">My Plan</Link>
              </Button>
              <UserButton className="bg-(--color-accent) size-sm"/>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hover:bg-(--color-accent-hover) hover:text(--color-foreground) px-5 font-semibold transition-all duration-150 ease-out">
                <Link to="/auth/sign-in">Sign-in</Link>
              </Button>

              <Button
                variant="default"
                size="sm"
                className="bg-(--color-accent) text-(--color-background) hover:bg-(--color-accent-hover) hover:text(--color-foreground) px-5 font-semibold transition-all duration-150 ease-out "
              >
                <Link to="/auth/sign-up">Sign-up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
