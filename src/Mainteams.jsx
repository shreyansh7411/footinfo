import Teams from './teams'
import './mainteams.css'
import { useEffect, useState } from 'react';
import { AiFillInstagram,  AiOutlineGlobal} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Mainteams () {
    const navigate = useNavigate();

    const handleOnClick = (team) => {
        navigate((`/team/${team.name}`), {state : { team }})
    }

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);

    const getTeams = () => {
        try {
            setLoading(false);
            setTeams(Teams)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(()=>{
        getTeams();
    }, []);

    if(loading){
        return <div className="p-4 text-white font-bold">Loading…</div>;
    }
    if(Error){
        return <div className="p-4 text-red-400">{Error}</div>;
    }

    return <>
        <div className="text-sm font-bold text-neutral-400 pb-3">
          Football today – Explore some of the greatest footballing clubs and nations.
        </div>
        <div className="main-box w-2/5 border border-none rounded-4xl bg-zinc-800 py-2">
            <div className="text-white h-10 justify-self-center">
                <div className="bg-black border border-purple-600 rounded-2xl py-1 px-2 hover:bg-purple-600 hover:border-none transition-colors duration-200 ease-in-out hover:cursor-pointer">Teams</div>
            </div>
            <hr className="text-white" />
            <div className="mainteam-btn text-white">
                {teams.map(t =>(
                    <div key={t.id} className='flex pb-3 text-gray-200 pl-4  hover:bg-black hover:cursor-pointer hover:pl-5 transition-all duration-200 ease-in-out hover:text-white hover:pr-1' onClick={() => handleOnClick(t)}>
                        <img src={t.crest} alt={t.name} className="w-10 h-10 object-contain pr-2" />
                        <div className='flex w-full justify-between'>
                            <div>
                                <span>{t.name}</span>
                                <div className='flex gap-2 items-center'>
                                    <img src={t.flag} alt={t.name} className="round-img" />
                                    {t.country}
                                </div>
                            </div>
                            <div className='flex items-center pr-2 gap-8'>
                                <a href={t.instagram}  target="_blank" rel="noopener noreferrer"><AiFillInstagram className='text-gray-400 text-xl hover:text-gray-200'/></a>
                                <a href={t.website}  target="_blank" rel="noopener noreferrer"><AiOutlineGlobal className='text-gray-400 text-xl hover:text-gray-200'/></a>
                            </div> 
                        </div>
                    </div>
                ))}
           </div>
        </div>
    </>
}

export default Mainteams