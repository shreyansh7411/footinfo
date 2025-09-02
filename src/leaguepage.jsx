import { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import api from './api';
import { useEffect } from 'react';
import Dropdown from './Dropdown';
import rulesfunc from './rules';
import Getrules from './Getrules';
import teammap from './mapping';

const leaguemap = {
    2021: "Premier League",
    2014: "La Liga",
    2002: "Bundesliga",
    2019: "Serie A",
    2015: "Ligue 1"
}

const leaguepage = () => {
    const {leagueId}= useParams();
    const current = new Date().getFullYear();
    const seasons = Array.from({length : 12}, (_, i) => current-i);
    const [selectedSeason, setSelectedSeason] = useState(`${current}`);
    const [Standings , setStandings] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
     const handleonClick = (teamId) => {
      navigate(`/standings/${teamId}`);
    }

    /* const fetchStandings = async () => {
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
    }; */
    const fetchStandings = async () => {
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


    useEffect(() => {
        if(selectedSeason){
            fetchStandings();
        }
    }, [selectedSeason, leagueId]);

    if(loading) {
        return <div className="text-white">Loading...</div>
    } 

  return <>
    <p className='text-sm font-bold text-neutral-400'>Football today - Explore the clubs and players of {leaguemap[leagueId]}</p>
    <div className="w-3/7 flex flex-col gap-4">
    <div className="bg-zinc-900 p-4  border border-none rounded-lg max-h-fit mb-2">
          <div className="text-white font-bold flex justify-center pb-2">Standings</div>
          <div className="flex gap-4">
            <div className="text-white bg-black flex justify-center items-center h-8 w-auto px-3 border border-none rounded-lg">{leaguemap[leagueId]}</div>
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
              {Standings.map((t) => (
                  <tr key={t.position} className="group cursor-pointer">
                  <td ><div className={`${rulesfunc(t.position, leaguemap[leagueId], Standings.length)} w-6.5 h-6.5 rounded-full flex justify-center items-center font-bold`}>{t.position}</div></td>
                  <td className="py-2 flex gap-1" onClick={() => handleonClick(teammap[t.name])}>
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
        <Getrules leagueName={leaguemap[leagueId]} />
        </div>
        </div>
    </>
}

export default leaguepage;
