import { useState, useEffect } from "react";
import "../styles/snowfall.css"; // Assure-toi que le chemin du CSS est correct

export function ParticipantInput({
  participants,
  onAddParticipant,
  onRemoveParticipant,
}) {
  const [currentName, setCurrentName] = useState("");

  const addParticipant = () => {
    if (currentName !== "") {
      onAddParticipant(currentName);
      setCurrentName("");
    }
  };

  // Effet neige
  useEffect(() => {
    // Fonction pour créer les flocons
    const createSnowflakes = () => {
      const numberOfSnowflakes = 100; // Nombre de flocons à générer
      const snowContainer = document.body; // Ou un autre conteneur spécifique

      for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");

        // Positionnement horizontal aléatoire
        snowflake.style.left = `${Math.random() * 100}vw`;

        // Taille aléatoire de chaque flocon
        const size = Math.random() * 10 + 10; // Taille entre 10px et 20px
        snowflake.style.fontSize = `${size}px`; // Utilisation de font-size si tu veux garder l'option dynamique

        // Durée d'animation aléatoire
        snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`; // Durée entre 5s et 8s

        // On donne une taille visuelle avec width et height
        snowflake.style.width = `${size}px`; // Largeur dynamique selon la taille
        snowflake.style.height = `${size}px`; // Hauteur dynamique selon la taille

        // Ajout d'un délai aléatoire pour chaque flocon
        const animationDelay = Math.random() * 3 + "s"; // Délai aléatoire entre 0s et 3s
        snowflake.style.animationDelay = animationDelay;

        snowContainer.appendChild(snowflake);
      }
    };

    // Lancer l'effet de neige au chargement du composant
    createSnowflakes();

    // Nettoyage : retirer les flocons lors du démontage
    return () => {
      const snowflakes = document.querySelectorAll(".snowflake");
      snowflakes.forEach((snowflake) => snowflake.remove());
    };
  }, []);

  return (
    <div className="space-y bg-[#D4D4D4]/20 p-5 backdrop-blur-md rounded-[30px]">
      <div className="flex space-x-2 ">
        <input
          type="text"
          className="input flex-grow text-white"
          placeholder="Entrez un nom"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addParticipant()}
        />
        <button
          className="button text-green-800 font-black"
          onClick={addParticipant}
        >
          Ajouter
        </button>
      </div>
      <ul className="space-y-2 ">
        {participants.map((name, index) => (
          <li key={index} className="list-item text-2xl mt-5" id="title">
            <span className="text-xl text-white" id="title">
              {index + 1} &nbsp;
            </span>

            {name}

            <div className="space-x-2 mt-1 mb-5">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onRemoveParticipant(index)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
