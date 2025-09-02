import footLogo from './assets/foot-logo.svg'
import laligaLogo from './assets/laliga-logo.svg'
import { FaSearch, FaEllipsisH  } from "react-icons/fa";
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { MdDarkMode, MdLightMode} from "react-icons/md";
import { useState } from 'react';


const Navbar = () => {
    const navigate = useNavigate();
    const handleLogoClick = (leagueId) => {
        navigate(`/league/${leagueId}`);
    };
    const [dark, setdark] = useState(true);
    

    return<>
    <div className='sticky top-0 z-50'>
    <div className='min-w-fit bg-zinc-900 flex p-1 justify-between gap-3'>
      <div className='flex pl-4'>
        <img src={footLogo} className='w-12 h-12 mr-2 flex-shrink-0' alt='Logo' title='FootInfo'/>          
        <div className='flex justify-center items-center'>
          <h1 className='text-3xl text-white font-bold whitespace-nowrap'>FootInfo</h1>
        </div>
      </div>
      <div className='flex py-1'>
        <input type='text' className='bg-gray-300 lg:w-lg md:w-md sm:w-sm px-2 border rounded-l-lg outline-gray-900 flex min-w-0' placeholder='search players, teams..'/>
        <button className='border border-none rounded-r-lg w-10 cursor-pointer px-2 '><FaSearch className='text-white'/></button>
      </div>
      <div className='flex justify-center items-center pr-5'>
        <button className="text-white text-2xl cursor-pointer transition-all duration-1000 ease-in-out transform hover:scale-110" onClick={()=>{setdark(!dark)}}>{dark?(<MdLightMode className="transition-opacity duration-300 opacity-100"/>):(<MdDarkMode className="transition-opacity duration-300 opacity-100"/>)}</button>
      </div>
    </div>
    <div className='min-w-full flex justify-between bg-zinc-900 gap-3'>
      <div className='flex justify-evenly text-white w-1/2'>
        <button className='top5-btn' onClick={() => handleLogoClick(2021)}>
          <div className='top5 flex justify-center pt-2'>
           <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.7 86.2" className='w-6.5 h-6.5 text-white'><path d="M13.4 7.1c3.8 1.8 6.3 4 6.7 4.3-.2-1-.9-5.7-1.4-8.6 2.2 1.5 7.4 5.1 9.1 6.3C28.4 7 30.9 0 30.9 0s4.3 7 5 8.1c.9-.9 6.1-6.7 7.4-8.1.3 3.3.5 8.1.6 8.7.3-.3 2.3-3.1 5.6-5.7-1.5 2.8-2.1 6.7-2.5 9.9-3.3-.9-6.7-1.4-10.2-1.4-6.8 0-13.2 1.8-18.8 5-1-3.1-2.5-6.9-4.6-9.4zm52.2 59.8-3-3.3c-.8 9-5.3 16.6-13.4 22L48 80.7c-6.9 5-18.6 8.1-28.8 2.4 1.3-6.4 2.3-12.9 0-20.7-5.6 8.7-10.6 12.1-10.6 12.1-3.8-6.4-3.5-19.1-2.3-22.9L0 53.5C0 49.2 3.1 40.1 7.6 35l-3.8-.6c2.7-5.5 6.6-10.1 11.6-13.7-1.5 2.4-1.5 8.1 2.8 10.3-1.8-3.2-2-7.1-.2-9.2 1.9-2.1 5.1-1.3 7.1.3-.6-1.8-2.4-4-5-4.2 5-2.6 10.9-4 16.9-4 1.2 0 2.3.1 3.3.2 1.8.7 4.3 3.2 5.6 4.8 0 0 .1-1.8-.9-4 6.6 1.6 9.7 4.3 11 5.6.3 2.8 1.1 4.5 2.3 7.2-2.1-2.3-7.5-6.2-10.1-7.1 0 0-.3 2.4-1.1 3.6-5.1-3.7-7.6-4.6-7.6-4.6-5.7.6-9.2 2.8-11.2 4.5l1.7 1.4c-3.3 1-5.6 4-5.6 4 0 .1 3 .5 3 .5s-.3 3.5 4.1 5.7c3.8 1.8 9.1-.4 14.2 1.6-3.3-3.8-5.6-5.6-5.6-5.6s-1.3-.3-2.3-.3c-1.2 0-2.9.3-4.8-.5-.9-.3-2-1-2.8-1.5 0 0 2.3-2.4 5.8-2.9 0 0 3.1.8 5.6 2.7 1.6-1.6 3.3-1.5 3.3-1.5s-1.7 1.6-1.2 3.5c2.4 2.2 5.1 5.3 5.1 5.3 2.7-1.5 8.6-1.2 9.8.3-1.5-2-3.8-3.6-5.5-5-.2-.8-2.1-3.3-2.3-3.6 0 0 1.8.6 3.3 1.9.4-.7 1.3-1.3 2.4-1.6 1.2 1 1.4 2.5 1.3 2.8-.5.7-1.1.9-1.1.9l2.8 3.1.3-2.3c6.8 9.2 10.4 20.1 5.8 33.9zM53.1 46.6v-4.8s-2.2-.7-4.5-2.5c-4.7.7-10.3 5.4-10.3 5.4s1.9 3.6 4 7.6c3.7.3 9.2-4.3 10.8-5.7zm4.7 8.8s-.3-2-2-3.8l-3.6.1s-5 4.2-7.9 4.3c0 0 1.7 3.1 2.5 4.7 1.7-.3 4.5-1.7 5.7-3 0 0 .8 2.5.6 5.5 1.7-1.2 4-3.8 4.7-7.8zm1.5-16.1c-1.8 1.5-3.3 2.4-3.3 2.4v4.8c1.3 1.4 2.6 2.7 3.6 4.8 1.8-3.1 1.4-7.9-.3-12z" className='fill-current'/></svg></div>
          </div>
          Premier league
        </button>
        <button className='top5-btn' onClick={() => handleLogoClick(2014)}>
          <div className='top5 flex justify-center pt-2'>
            <img src={laligaLogo} className='w-6.5 h-6.5'/>
          </div>
          Laliga
        </button>
        <button className='top5-btn' onClick={() => handleLogoClick(2002)}>
          <div className='top5 flex justify-center pt-2'>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="533.333" height="533.333" version="1.0" viewBox="0 0 400 400" className='w-6.5 h-6.5 text-white'><path d="M0 200v200h400V0H0v200zM182.3 80c2.4 1.2 5.9 3.6 7.7 5.5 3.7 3.8 3.7 4.1 2.5 18.5-.5 5.2-1.3 8.1-2.5 9.5-1.1 1.1-2.8 4-3.9 6.4l-2 4.5-5-.3c-4.9-.2-5-.2-6.9 3.6-4.3 8.5-13.1 34.9-11.9 35.9.1.1 9.7 1.4 21.2 2.9 16.5 2.1 21.3 3.1 22.6 4.5.8 1 3.5 2.1 6 2.5 2.4.4 9.1 2.2 14.9 4.1 7.1 2.2 12.8 3.4 17.5 3.5 7.6.3 11.6 1.6 31 9.9 15.3 6.6 28.2 9.8 44.8 11.1 12.4.9 15.7 1.8 15.7 4.2 0 1.7-3.2 4.7-5 4.7-1 0-2 .6-2.3 1.4-.3.8-1.4 1.4-2.4 1.4-2.2-.1-14.8 5.5-15.7 7.1-.4.6-1.5 1.1-2.6 1.1-1 0-2 .6-2.3 1.3-.7 1.8-6.9 1.6-9.1-.2-.9-.8-1.9-3.1-2.2-5.3-.5-3-1.3-4.2-3.3-5-1.4-.6-12-1.4-23.6-1.7l-21-.7-6-3.2c-6-3.1-6.1-3.1-22-3.3-10.8 0-16.1.3-16.3 1-.3.8-7.7 1.1-23.5 1.2-15 0-22.4.3-20.9.9 1.2.5 2.6 2 3.1 3.2 1.3 3.5 2.5 20.8 1.4 20.8-.6 0-.8 6.7-.5 16.5l.5 16.5-3.5 3.3c-1.9 1.7-5.3 4.1-7.6 5.2-2.2 1.1-4.3 2.7-4.5 3.5-.2.9-6.4 3.7-14.8 6.9-41.9 15.7-51.5 20.7-58.4 29.9-6 8.2-5.9 8.1-8.8 5.9-1.1-.8-1.7-2.7-1.7-5.7-.2-8 .7-10.8 5.4-16.8 2.5-3.2 4.6-6.8 4.6-8 0-1.2.4-2.2.9-2.2s1.1-1 1.3-2.2c.2-1.2 1.5-2.9 3-3.8 2.3-1.3 3.2-1.3 6-.1 4.6 1.8 8.3 2.4 11.2 1.7 1.3-.3 7.8-5.3 14.3-11.1 7.9-7.1 14-11.6 18.5-13.8 4.9-2.4 6.5-3.6 6.1-4.7-.4-.8-2.1-5.8-3.9-11-1.9-5.4-3.9-9.6-4.8-9.8-.8-.2-1.9-1.5-2.5-3-2.4-5.8-6.1-27.3-6.8-38.5-.3-6.4-1-11.7-1.5-11.7-3.4 0 3.6-42.2 8.7-52 .8-1.5 2.6-3.1 4-3.4 5.1-1.3 2.3-2.3-8.1-2.9l-10.6-.7-12.6 10.8c-7.9 6.8-13.6 12.4-15.1 15.1-3 5.5-8.8 9.3-15 9.9-6.7.6-7.6-1.2-2.5-5.5 3.7-3.2 3.7-3.3 1-2.3-6.1 2.2-7.6-.9-1.9-3.9 2.1-1 4.9-3.1 6.3-4.6 1.4-1.5 3.7-3.3 5.1-3.9 1.4-.6 7.1-6.7 12.7-13.6 15.2-18.8 16.5-20 21.1-20 1.2 0 2.1-.6 2.1-1.4 0-1 2-1.6 7.4-2.1 8.5-.8 34.9-.1 38.4 1 1.9.6 2.2.4 2.2-2.1 0-14 13.5-22.4 26.3-16.4zM366 159.2c7 3.6 10.3 8.6 10.8 16.2.4 6.7-.9 10.8-5.2 15.4-7 7.8-20.6 8.2-28.5.9-5.6-5.2-7.6-15.1-4.6-22.5 4.5-10.7 17.1-15.3 27.5-10z" className='fill-current'/></svg></div>
          </div>
          Bundesliga
        </button>
        <button className='top5-btn' onClick={() => handleLogoClick(2015)}>
          <div className='top5 flex justify-center pt-2'>
           <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60" className="w-6.5 h-6.5">
      <g transform="matrix(.44962 0 0 -.44962 -1596.905 937.635)">
        <path
          d="m0 0 19.514 51.531L27.94 29.28H17.302l-7.255-19.16h25.149L39.028 0Z"
          transform="translate(3602.817 1990.353)"
          className="fill-black"
        />
        <path
          d="m0 0 50.379 31.925H19.514Zm0 0-50.379 31.925h30.865z"
          transform="translate(3622.331 1958.428)"
          className="fill-black"
        />
        <path
          d="m3602.812 1990.353 19.519-31.926 19.514 31.926z"
          transform="translate(0 0)"
          className="fill-white"
        />
        <path
          d="m3608.416 2075.266-36.464-84.914h30.865l19.514 51.532 8.426-22.251h-10.637l-7.256-19.161h25.149l3.832-10.12h30.865l-36.464 84.914z"
          transform="translate(0 0)"
          className="fill-white"
        />
      </g>
    </svg></div>
          </div>
          Serie A
        </button>
        <button className='top5-btn' onClick={() => handleLogoClick(2019)}>
          <div className='top5 flex justify-center pt-2'>
            <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="13 0 230 260" className="w-6.5 h-6.5" fill="white"><path d="M218.75,5.08c-9.97,2.76-36.19,9.86-58.27,15.84-22.08,5.93-40.38,11.09-40.74,11.4-.36.36-3.02,7.26-5.93,15.44l-5.32,14.82 14.16.26 14.21.26-1.94,6.64c-1.07,3.63-4.29,14.92-7.16,25.04-9.1,32.1-36.29,127.62-37.31,131.1-2.2,7.41-2.45,8.69-2.15,8.79.2.1,22.28.05,49.12-.1l48.76-.26 1.99-7.16c4.8-17.38,5.67-20.5,5.88-21.11.2-.46-6.59-.61-33.02-.61-18.3,0-33.27-.1-33.27-.2s.72-2.56,1.53-5.47c2.45-8.43,2.86-9.97,5.37-18.86,1.28-4.65,2.81-9.92,3.32-11.76,1.53-5.21,2.76-9.61,6.34-22.23,1.84-6.49,7.56-26.73,12.78-44.98,13.6-47.89,14.62-51.57,14.62-52.18,0-.51,21.67-6.34,23.41-6.34.36,0,.56.2.41.41-.15.26-.97,2.96-1.79,6.03-2.56,9.4-11.7,42.68-12.78,46.46-1.89,6.75-6.24,22.49-11.65,42.17-9.2,33.73-11.91,43.7-11.91,44.11,0,.2,6.95.31,15.44.26l15.44-.15.36-1.28c.2-.72,1.99-7.26,4.04-14.57,1.99-7.31,5.37-19.52,7.51-27.09,2.1-7.62,4.14-14.98,4.5-16.36,1.07-4.04,10.53-38.03,16.1-58.01,1.38-4.91,3.78-13.65,5.37-19.42,3.37-12.22,6.03-21.77,9.46-34.24C239.1-.69,238.99-.03,237.87.02c-.56.05-9.15,2.3-19.12,5.06Z"/></svg></div>
          </div>
          <i>Ligue 1</i>
        </button>
        <button className='top5-btn' onClick={() => navigate("/more")} >
          <div className='top5 flex justify-center pt-2'>
            <FaEllipsisH/>
          </div>
          More
        </button>
      </div>
    </div>
    </div>
  </>  
}

export default Navbar
