import { useState } from "react";
import SantaHead from "./SantaHead";

export default function Home() {
  return (
    <main className="bg-[url('/bg-home.jpg')] h-full  bg-cover flex items-center flex-col pt-5 gap-10 overflow-x-hidden">
      <h1
        className="text-6xl font-bold text-primary text-white drop-shadow-[5.2px_5.2px_5.2px_rgba(0,0,0,0.5)]"
        id="title"
      >
        Secret Santa
      </h1>

      {/* <img src="santa.png" alt="" className="w-72 h-72 items-center " /> */}

      <div className="relative flex justify-center">
        <SantaHead />
      </div>

      <div className="flex flex-col justify-center items-center gap-5 bg-[#D4D4D4]/20 w-full h-full p-10 backdrop-blur-md rounded-tl-[30px] rounded-tr-[30px]">
        <h2 className="text-2xl text-white">Share with your friends</h2>
        <p className="text-md text-white">Give and receive presents</p>
        <a
          href=""
          className="bg-green-800 py-3 px-22 rounded-xl text-white text-xl"
        >
          Start now
        </a>
      </div>
    </main>
  );
}
