const rulesfunc = (position, leagueName) => {
  position = parseInt(position);

  if (leagueName === "Premier League") {
    if (position >= 1 && position <= 4) return "text-black bg-green-600"; 
    if (position === 5) return "text-black bg-blue-500"; 
    if (position >= 18) return "text-black bg-red-400"; 
  }

  if (leagueName === "La Liga") {
    if (position >= 1 && position <= 4) return "text-black bg-green-600";
    if (position === 5) return "text-black bg-blue-500";
    if (position === 6) return "text-black bg-sky-500";
    if (position >= 18) return "text-black bg-red-400";
  }

  if (leagueName === "Bundesliga") {
    if (position >= 1 && position <= 4) return "text-black bg-green-600";
    if (position === 5) return "text-black bg-blue-500";
    if (position === 6) return "text-black bg-sky-500";
    if (position >= 17) return "text-black bg-red-400";
    if (position === 16) return "text-black bg-yellow-600"; 
  }

  if (leagueName === "Serie A") {
    if (position >= 1 && position <= 4) return "text-black bg-green-600";
    if (position === 5) return "text-black bg-blue-500";
    if (position === 6) return "text-black bg-sky-500";
    if (position >= 18) return "text-black bg-red-400";
  }

  if (leagueName === "Ligue 1") {
    if (position >= 1 && position <= 3) return "text-black bg-green-600"; // UCL direct
    if (position === 4) return "text-black bg-green-400"; // UEL
    if (position === 5) return "text-black bg-blue-500"; // Conference League (possible)
    if (position === 6) return "text-black bg-sky-500";
    if (position === 16) return "text-black bg-yellow-600"; // Playoff
    if (position >= 17) return "text-black bg-red-400"; // Relegation
  }

  return "bg-black"; 
};

export default rulesfunc;