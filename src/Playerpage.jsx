import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from './api';

const Playerpage = () => {
  const getRatingColor = (rating) => {
      if (rating >= 9) return 'bg-blue-800';     
      if (rating >= 8) return 'bg-blue-600';     
      if (rating >= 7) return 'bg-green-400';     
      if (rating >= 6.5) return 'bg-yellow-400';    
      if (rating >= 5) return 'bg-orange-500';  
      if (rating >= 4) return 'bg-red-500';       
      return 'bg-red-700';                       
  };

  const {teamId, playerName} = useParams();
  const [player, setPlayer] = useState(null);
  const [active, setActive] = useState("Details");


 /*  const fetchPlayer = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/squad/${teamId}/player/${encodeURIComponent(playerName)}`);
      setPlayer(response.data);
    }
    catch (error) {
      console.error("Error fetching player data:", error);
      throw error;
    }
  }; */

  const fetchPlayer = async () => {
  try {
    const response = await api.get(
      `/api/squad/${teamId}/player/${encodeURIComponent(playerName)}`
    );
    setPlayer(response.data);
  } catch (error) {
    console.error("Error fetching player data:", error);
  }
};


  

  useEffect(() => {
    fetchPlayer();
  }, [teamId, playerName]);

  if (!player) {
    return <div>Loading player data...</div>;
  }
  return <>
  <div className='min-h-screen flex flex-col gap-4'>
    <div className="w-3/4 bg-zinc-900 text-black p-4 border rounded-4xl flex justify-between mb-4">
          <div className='flex'>
            <div>
              <img src={player?.imageUrl} alt={player?.name} className="w-25 h-25 rounded-full"/>
          </div>
          <div className="text-white pt-4 pl-6 font-bold">
              <div className="text-xl pb-3">{player?.name}</div>
              <div className="flex gap-8">
                  <div className="flex gap-4">
                    <div className='flex gap-1'>
                    <img src={player?.flagUrl} alt={player?.country} className="w-6 h-6 border rounded-2xl object-cover"/>
                    <p className="">{player?.country}</p>
                    </div>
                    <div className='text-gray-300 font-normal text-sm flex justify-center items-center'>contract-until:{player.contractUntil}</div>
                  </div>
              </div>
          </div>
          </div>
          <div className='text-white flex gap-2 justify-center items-center text-2xl font-bold'>
            <div className={`${getRatingColor(player.averRating)} w-5 h-5 border-b border-r border-white`}></div>
            <div className=''>{player.averRating}</div>
          </div>
      </div>
      <div className='text-white bg-zinc-900 w-1/2 p-4 border rounded-xl border-none flex flex-col gap-8'>
      <div className='flex justify-center items-center gap-12'>
        <div className={`font-bold flex justify-center items-center bg-black px-3 h-8 border border-gray-500 rounded-lg cursor-pointer hover:text-black  transition-colors duration-300 ease-in-out ${active === 'Details'? "bg-gray-300 text-black hover:bg-gray-300":"hover:bg-gray-400"}`} onClick={() => setActive('Details')}>Details</div>
        <div className={`font-bold flex justify-center items-center bg-black px-3 h-8 border border-gray-500 rounded-lg cursor-pointer hover:text-black  transition-colors duration-300 ease-in-out ${active === 'Statistics'? "bg-gray-300 text-black hover:bg-gray-300":"hover:bg-gray-400"}`} onClick={() => setActive('Statistics')}>Statistics</div>
      </div>
      {active === "Details" && (
        <>
          <div className="flex justify-between px-2 text-sm">
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-xs text-gray-300">Shirt Number</p>
              <p>{player.shirtNumber}</p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-xs text-gray-300">Date of Birth</p>
              <p>{player.DOB}</p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-xs text-gray-300">Height</p>
              <p>{player.height} cm</p>
            </div>
          </div>

          <div className="flex justify-between px-2 text-sm mt-3">
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-xs text-gray-300">Preferred Foot</p>
              <p>{player.preferredFoot}</p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-xs text-gray-300">Position</p>
              <p>{player.position}</p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-xs text-gray-300">Contract Until</p>
              <p>{player.contractUntil}</p>
            </div>
          </div>
        </>
      )}

      {active === "Statistics" && (
        <div className="flex justify-between px-2 text-sm">
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-xs text-gray-300">Games</p>
            <p>{player.totalGames}</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-xs text-gray-300">Goals</p>
            <p>{player.totalGoals}</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-xs text-gray-300">Assists</p>
            <p>{player.totalAssists}</p>
          </div>
        </div>
      )}
      </div>
      <div className='text-white w-1/2 bg-zinc-900 border-none p-4 rounded-lg'>
      <div className='flex justify-center'><p className='font-bold bg-black p-2 border-none rounded-xl hover:bg-gray-300 hover:text-black transition-all ease-in-out duration-300'>About the player</p></div>
      {player.description}
      </div>
    </div>
  </>
}

export default Playerpage
