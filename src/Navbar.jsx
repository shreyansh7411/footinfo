import footLogo from './assets/foot-logo.svg'
import laligaLogo from './assets/laliga-logo.svg'
import { FaSearch, FaEllipsisH  } from "react-icons/fa";
import './Navbar.css'


const Navbar = () => {
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
        <button className='bg-white text-black text-xl border rounded-lg px-2 py-1 hover:border hover:border-white ursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-300 ease-in-out'>switch</button>
      </div>
    </div>
    <div className='min-w-full flex justify-between bg-zinc-900 gap-3'>
      <div className='flex justify-evenly text-white w-1/2'>
        <button className='top5-btn'>
          <div className='top5 flex justify-center pt-2'>
            <img src={laligaLogo} className='w-6.5 h-6.5 text-white'/>
          </div>
          Premier league
        </button>
        <button className='top5-btn'>
          <div className='top5 flex justify-center pt-2'>
            <img src={laligaLogo} className='w-6.5 h-6.5'/>
          </div>
          Laliga
        </button>
        <button className='top5-btn'>
          <div className='top5 flex justify-center pt-2'>
            <img src={laligaLogo} className='w-6.5 h-6.5'/>
          </div>
          Bundesliga
        </button>
        <button className='top5-btn'>
          <div className='top5 flex justify-center pt-2'>
            <img src={laligaLogo} className='w-6.5 h-6.5'/>
          </div>
          Serie A
        </button>
        <button className='top5-btn'>
          <div className='top5 flex justify-center pt-2'>
            <img src={laligaLogo} className='w-6.5 h-6.5'/>
          </div>
          <i>Ligue 1</i>
        </button>
        <button className='top5-btn'>
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
