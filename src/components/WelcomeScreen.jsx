// Ecran d'accueil de l'application
// Ce composant prend en props une fonction pour démarrer l'application : onStart
import SantaHead from "./SantaHead";
export function WelcomeScreen({ onStart }) {
  return (
    <main className="">
      <h1
        className="text-6xl font-bold text-primary flex justify-center text-white drop-shadow-[5.2px_5.2px_5.2px_rgba(0,0,0,0.5)]"
        id="title"
      >
        Secret Santa
      </h1>

      <div className="relative flex justify-center">
        <SantaHead />
      </div>

      <div className="flex flex-col justify-center items-center gap-5 bg-[#D4D4D4]/20 w-full h-full p-10 mt-10 backdrop-blur-md rounded-[30px]">
        <h2 className="text-2xl text-white">Partagez avec vos amis</h2>
        <p className="text-md text-white">Donnez et recevez des cadeaux !</p>
        <button
          onClick={onStart}
          href=""
          className="bg-green-800 py-3 px-22 rounded-xl text-white text-xl hover:cursor-pointer"
        >
          Commencer
        </button>
      </div>
    </main>
  );
}
