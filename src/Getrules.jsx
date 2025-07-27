import { useEffect, useState } from "react";
import './Getrules.css'

const Getrules = ({leagueName}) => {
    const [rules, setRules] = useState([]);

    const getrule = (league) => {
        if(league === "Premier League"){
            return [
                "Champions League",
                "UEFA Europa League",
                "Relegation"
            ]
        }
        else if(league === "La Liga" || league === "Serie A"){
            return [
                "Champions League",
                "UEFA Europa League",
                "Conference League Qualification",
                "Relegation"
            ]
        }
        else if(league === "Bundesliga"){
            return [
                "Champions League",
                "UEFA Europa League",
                "Conference League Qualification",
                "Relegation Playoffs",
                "Relegation"
            ]
        }
        else if(league === "Ligue 1"){
            return [
                "Champions League",
                "Champions League Qualification",
                "UEFA Europa League",
                "Conference League Qualification",
                "Relegation Playoffs",
                "Relegation"
            ]
        }
        return [];
    }

    const colorfunc = (rule) => {
    if(rule === "Champions League") return "bg-green-600";
    if(rule === "Champions League Qualification") return "bg-green-400";
    if(rule === "UEFA Europa League") return "bg-blue-500";
    if(rule === "Conference League Qualification") return "bg-sky-500";
    if(rule === "Relegation Playoffs") return "bg-yellow-600";
    if(rule === "Relegation") return "bg-red-400";
    return "bg-black"
  }
   
    useEffect(()=>{
        const data = getrule(leagueName);
        setRules(data);
    },[leagueName])

  return (
    <div className=" text-gray-300">
        <div className="text-white font-semibold text-sm">Rules</div>
        {rules.map((rule, index) => (
            <div className="flex gap-2 pl-4 pb-1" key={index}>
                <div className={`flex items-center`}><div className={` w-2 h-2 rounded-full ${colorfunc(rule)}`}></div></div>
                <div className="text-xs">{rule}</div>
            </div>
        ))}
        <div className="text-xs text-white pb-1 font-semibold">In the event that two (or more) teams have an equal number of points, the following rules break the tie:</div>
        <div className="text-xs text-white pb-1">1. Head-to-head</div>
        <div className="text-xs text-white pb-1">2. Goal difference</div>
        <div className="text-xs text-white pb-1">3. Goals scored</div>
    </div>
  )
}

export default Getrules
