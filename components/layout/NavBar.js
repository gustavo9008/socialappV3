import Link from "next/link";

// import { signIn, signOut, useSession } from "next-auth/client";
import { useCurrentUser } from "@/hooks/index";

const NavBar = (props) => {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };

  return (
    <nav
      id="navbar"
      className="bg-gray-800 text-white sticky top-0 z-50 border-b-2 border-gray-900"
      role="menubar"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex ">
            <div className="flex">
              <Link href="/">
                <a
                  className="rounded bg-gray-700 gen hover:text-white hover:bg-gray-600 p-2"
                  role="menuitem"
                  aria-label="home page button"
                >
                  <i className="fas fa-laptop-code"></i>{" "}
                  <span className="nav-logo font-medium antialiased">
                    Dev.me
                  </span>
                </a>
              </Link>
            </div>
          </div>
          {!session && (
            <a
              onClick={() => signIn()}
              className="rounded font-medium text-gray-900 antialiased bg-blue-400 hover:bg-blue-600 p-2 mr-1.5"
              role="menuitem"
              aria-label="login button"
            >
              Login
            </a>
          )}

          {session && (
            <a
              onClick={handleLogout}
              className="rounded font-medium text-black bg-red-600 hover:bg-red-700 p-2 Psm:mr-3 mr-1.5 tracking-wide"
              aria-label="Sign out button"
            >
              Sign out
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
