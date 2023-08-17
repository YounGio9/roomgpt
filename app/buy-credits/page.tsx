"use client";
import React from "react";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";

function BuyCredit() {
  const { data: session, status } = useSession();
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header photo={session?.user?.image || undefined} />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 mb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Buy RoomGPT Credits
            </p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 sm:mb-10">
          You have <span className="font-semibold text-gray-400">1 credit</span>
          . Join thousands of happy customers by buying more below.
        </p>
      </main>
      <div className="mt-10 text-center">
        <h4 className="flex-none leading-6 mt-2 text-2xl font-bold tracking-tight text-white sm:text-4xl">
          What’s included
        </h4>
      </div>

      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6 mb-10 sm:pl-0 pl-4"
      >
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Premium support by email
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Ability to request features
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Commercial usage of photos
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Early access to new features
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Coming Soon: Save your rooms in a dashboard
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Coming Soon: Premium room types and styles
        </li>
      </ul>
    </div>
  );
}

export default BuyCredit;
