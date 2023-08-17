import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header({ photo }: { photo?: string }) {
  const [isActiveMenu, setIsActiveMenu] = React.useState<boolean>(false);
  return (
    <header className="flex relative flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="header text"
          src="/bed.svg"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          roomGPT.io
        </h1>
      </Link>
      {isActiveMenu && (
        <div className="absolute top-14 right-2 text-black bg-white rounded-lg p-2">
          <div className="px-2 py-1.5 text-sm font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                Giovani de Souza
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                giovanidesouza999@gmail.com
              </p>
            </div>
          </div>
          <div
            role="separator"
            aria-orientation="horizontal"
            className="-mx-1 my-1 h-px bg-muted"
          ></div>
          <Link href="/buy-credits">
            <div
              role="menuitem"
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              data-orientation="vertical"
              data-radix-collection-item=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="16"></line>
                <line x1="8" x2="16" y1="12" y2="12"></line>
              </svg>
              <span>Buy Credits</span>
            </div>
          </Link>
          <div
            role="menuitem"
            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            data-orientation="vertical"
            data-radix-collection-item=""
            onClick={() => signOut()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            <span>Log out</span>
          </div>
        </div>
      )}

      {photo && (
        <button onClick={() => setIsActiveMenu(!isActiveMenu)}>
          <Image
            alt="header text"
            src={photo}
            className="sm:w-10 sm:h-10 w-9 h-9 rounded-full"
            width={24}
            height={24}
          />
        </button>
      )}
    </header>
  );
}

function Google({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
