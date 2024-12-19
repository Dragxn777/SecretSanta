// Ce composant affiche la liste des assignments
// Il prend en props le tableau d'assignments
export function AssignmentDisplay({ assignments }) {
  return (
    <ul className="space-y-2 flex flex-col gap-5 items-center">
      {assignments.map((assignment, index) => (
        <li key={index}>
          <span className="font-bold text-green-800 text-3xl pr-5" id="title">
            {assignment.giver}
          </span>{" "}
          offre un cadeau à{" "}
          <span className="font-bold text-green-800 text-3xl pl-5" id="title">
            {assignment.receiver}
          </span>
        </li>
      ))}
    </ul>
  );
}
