import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from './api'
import teamtoleague from "./teamtoleaguemap";
import axios from "axios";
import Dropdown from "./Dropdown";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import Getrules from "./Getrules";
import rulesfunc from "./rules";
import laligamap from "./mapping";
import laligateams from '../backend/data/laliga/team'
import premteams from '../backend/data/prem/team'
import bundesligateams from '../backend/data/bundesliga/team'
import ligue1teams from '../backend/data/ligue1/team'
import serieateams from '../backend/data/seriea/team'

const Teamstandingpage = () => {
  const allLeagues = [laligateams, premteams, bundesligateams, ligue1teams, serieateams];

  const findTeamById = (teamId) => {
    for (const league of allLeagues) {
      const team = league.find(t => t.teamId === teamId);
      if (team) return team;
    }
    return null; 
  }

  const getRatingColor = (rating) => {
      if (rating >= 9) return 'bg-blue-800';     
      if (rating >= 8) return 'bg-blue-600';     
      if (rating >= 7) return 'bg-green-400';     
      if (rating >= 6.5) return 'bg-yellow-400';    
      if (rating >= 5) return 'bg-orange-500';  
      if (rating >= 4) return 'bg-red-500';       
      return 'bg-red-700';                       
  };

  const navigate = useNavigate();
  const handleonClick = (teamId) => {
    navigate(`/standings/${teamId}`);
  }

  let i = 1;
  const {teamId} = useParams();
  const current = new Date().getFullYear();
  const seasons = Array.from({length : 12}, (_, i) => current-i);
  const [selectedSeason, setSelectedSeason] = useState(`${current}`);
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [squad, setSquad] = useState([]);
  const [manager, setManager] = useState({});
  const [imageError, setImageError] = useState(false);
  const leagueId = teamtoleague[teamId];
  const team = findTeamById(teamId);
  const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/standings/${leagueId}`, {
          params: { season: selectedSeason },
        });
        setStandings(response.data);
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
  };

  const fetchSquad = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/squadby-id/${teamId}`);
        setSquad(res.data.players);
        setManager(res.data.manager);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }; 

    /* const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/standings/${leagueId}`, {
          params: { season: selectedSeason },
        });
        setStandings(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSquad = async () => {
      try {
        const res = await api.get(`/api/squadby-id/${teamId}`);
        setSquad(res.data.players);
        setManager(res.data.manager);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }; */

    const [visible, setVisible] = useState(5);
    const [expanded, setExpanded] = useState(false);

    const toggleShow = () => {
      if(expanded){
        setVisible(5);
      }
      else{
        setVisible(squad.length);
      }
      setExpanded(!expanded)
    }

    useEffect(()=>{
      fetchStandings();
    }, [selectedSeason]);

    useEffect(() => {
      if (teamId) {
        fetchSquad();
      }
    }, [teamId]);
  

  if(loading) {
    return <div className="text-white">Loading...</div>
  }

  return <>
      <div className="w-3/4 bg-zinc-900 text-black p-4 border rounded-4xl flex mb-4">
          <div>
              <img src={team?.crestUrl} alt={team?.name} className="w-25 h-25"/>
          </div>
          <div className="text-white pt-4 pl-6 font-bold">
              <div className="text-xl pb-3">{team?.name}</div>
              <div className="flex gap-8">
                  <div className="flex gap-1">
                    <img src={team?.flagUrl} alt={team?.country} className="w-6 h-6 border rounded-2xl object-cover"/>
                    <p className="">{team?.country}</p>
                  </div>
                  <div className="font-normal flex gap-2 text-sm">
                    <img src={manager.imageUrl} className="w-8 h-8 border border-none rounded-full"/>
                    <div className="leading-none">
                      {manager.name}
                      <p className="text-gray-400 text-xs">manager</p>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="py-4 px-2 flex gap-8">
        <div className="text-white bg-zinc-900 w-1/4 max-h-fit border border-none rounded-lg">
          <div className="flex justify-center p-4 font-bold">Top players</div>
          {squad.slice(0, visible).map((player) => (
            <div key={player.name} className="text-white p-4 hover:bg-zinc-800 flex justify-between">
              <div className="flex gap-2">
                <div>{i++}</div>
                <div>
                {imageError ? (
                    <HiUserCircle className="w-6 h-6"/>
                  ) : (
                    <img src={player.imageUrl} alt={player.name} className="w-8 h-8 border border-none rounded-full" onError={() => setImageError(false)}/>)}
                </div>
                <div>{player.name}</div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className={`w-3.5 h-3.5 ${getRatingColor(player.averRating)} border-b border-r border-white`}></div>
                <div>{player.averRating}</div>
              </div>
            </div>
          ))}
          { squad.length > 5 && (
            <div className="flex justify-center pb-3 "><button onClick={toggleShow} className="flex gap-2 px-2 py-1 bg-black border border-none rounded-2xl hover:bg-zinc-700 transition-colors duration-200">
              {expanded ? `Show less` : `Show more`}
              <div className="flex items-center">{expanded ? <FaCaretUp/> : <FaCaretDown/>}</div>
            </button></div>
          )}
        </div>
        <div className="w-3/7 flex flex-col gap-4">
          <div className="bg-zinc-900 p-4  border border-none rounded-lg max-h-fit mb-2">
            <div className="text-white font-bold flex justify-center pb-2">Standings</div>
            <div className="flex gap-4">
              <div className="text-white bg-black flex justify-center items-center h-8 w-auto px-3 border border-none rounded-lg">{team.league}</div>
              <div className="flex-shrink-0"><Dropdown  seasons={seasons} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/></div>
            </div>
            <table className="w-full text-sm text-white">
              <thead className="text-left  font-bold text-gray-300">
                <tr className="border-b border-gray-500">
                  <th className="table-1 pl-1">#</th>
                  <th className="table-1 pl-1">Team</th>
                  <th className="table-1 pl-0.5">P</th>
                  <th className="table-1">W</th>
                  <th className="table-1">D</th>
                  <th className="table-1">L</th>
                  <th className="table-1">DIFF</th>
                  <th className="table-1">PTS</th>
                  <th className="table-1 pl-2">Last 5</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((t) => (
                    <tr key={t.position} className="group cursor-pointer">
                    <td ><div className={`${rulesfunc(t.position, team.league, standings.length)} w-6.5 h-6.5 rounded-full flex justify-center items-center font-bold`}>{t.position}</div></td>
                    <td className="py-2 flex gap-1" onClick={() => handleonClick(laligamap[t.name])}>
                      <img src={t.crest} alt={t.name} className="w-5 h-5"/>
                      {t.name}
                    </td>
                    <td className="py-2 group-hover:bg-gray-600 group-hover:border border-none rounded-l-lg px-0.5">{t.played}</td>
                    <td className="py-2 group-hover:bg-gray-600 px-0.5">{t.won}</td>
                    <td className="py-2 group-hover:bg-gray-600 px-0.5">{t.drawn}</td>
                    <td className="py-2 group-hover:bg-gray-600 px-0.5">{t.lost}</td>
                    <td className="py-2 group-hover:bg-gray-600 px-0.5">{t.gd}</td>
                    <td className="py-2 group-hover:bg-gray-600 group-hover:border border-none rounded-r-lg ">{t.points}</td>
                    <td className="py-2 flex">
                      {t.form?.split(',').map((res, idx) => (
                        <div
                          key={idx}
                          className={`w-4 h-4 text-center text-xs font-bold
                            ${
                              res === "W"
                                ? "bg-green-400 text-gray-800"
                                : res === "D"
                                ? "bg-gray-300 text-gray-800"
                                : res === "L"
                                ? "bg-red-400 text-gray-800"
                                : ""
                            }`}
                        >
                          {res}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-zinc-900 text-white p-4 border border-none rounded-2xl">
          <Getrules leagueName={team.league} />
          </div>
        </div>
      </div>
    </>
}

export default Teamstandingpage;
