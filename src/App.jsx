import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ParticipantInput } from "./components/ParticipantInput";
import { AssignmentDisplay } from "./components/AssignmentDisplay";
import "./fonts/Christmas.otf";

export default function App() {
  // Tableau des participants
  const [participants, setParticipants] = useState([]);
  // Tableau des assignments
  const [assignments, setAssignments] = useState([]);
  // Etat de l'application welcome | input | assignments
  const [currentScreen, setCurrentScreen] = useState("welcome");

  // Fonction pour ajouter un participant
  const addParticipant = (name) => {
    setParticipants([...participants, name]);
  };

  // Fonction pour supprimer un participant
  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  // Fonction pour distribuer les cadeaux
  const distributeGifts = () => {
    // S'il n'y a pas assez de participants, on affiche une alerte
    if (participants.length < 2) {
      alert("Il faut au moins 2 participants pour faire un Secret Santa !");
      return;
    }

    // On mélange le tableau des participants
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    // On crée un nouveau tableau d'assignments
    const newAssignments = shuffled.map((giver, index) => ({
      giver,
      receiver: shuffled[(index + 1) % shuffled.length],
    }));

    // On met à jour le state des assignments
    setAssignments(newAssignments);
    // On affiche l'écran des assignments
    setCurrentScreen("assignments");
  };

  // Fonction pour recommencer l'application
  const resetApp = () => {
    setParticipants([]);
    setAssignments([]);
    setCurrentScreen("welcome");
  };

  return (
    <div className="bg-[url('/bg-home.jpg')] h-screen bg-cover flex items-center flex-col pt-5 gap-10 overflow-x-hidden">
      <div className="">
        {currentScreen === "welcome" && (
          <WelcomeScreen onStart={() => setCurrentScreen("input")} />
        )}
        {currentScreen === "input" && (
          <>
            <h2
              className="text-4xl text-white font-bold my-12 text-center"
              id="title"
            >
              Ajoutez les participants
            </h2>
            <ParticipantInput
              onAddParticipant={addParticipant}
              participants={participants}
              onRemoveParticipant={removeParticipant}
            />
            <div className="mt-6 flex items-center">
              <button
                className="button text-white w-full gap-1.5 flex bg-green-800 rounded-3xl p-5 my-5 text-2xl hover:cursor-pointer"
                onClick={distributeGifts}
              >
                <img src="santa.png" alt="" className="w-8 h-8 items-center" />
                Distribuer les cadeaux
              </button>
            </div>
          </>
        )}
        {currentScreen === "assignments" && (
          <>
            <h2
              className="text-5xl text-white font-bold my-12 text-center"
              id="title"
            >
              Attributions des cadeaux
            </h2>
            <AssignmentDisplay assignments={assignments} />
            <div className="mt-6 flex flex-col justify-center items-center">
              <button
                className="button text-center text-white w-auto gap-1.5 flex justify-center bg-green-800 rounded-3xl p-5 my-10 text-xl hover:cursor-pointer"
                onClick={resetApp}
              >
                Recommencer
              </button>
              <img src="santa.png" alt="" className="w-64 h-64" />{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
