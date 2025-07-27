import { useEffect, useRef, useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const Dropdown = ({seasons, selectedSeason, setSelectedSeason}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setOpen(false);
            }
        }
        console.log("Dropdown rendered");
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[open]);

    const formatSeason = (year) => `${String(year).slice(-2)}/${String(year + 1).slice(-2)}`;

    return (
    <div ref={dropdownRef} className='pb-4 relative'>
      <div onClick={() => setOpen((prev) => !prev)} className='flex gap-3 text-white bg-black px-2 py-1 w-20 border border-none rounded-lg'>
        {formatSeason(Number(selectedSeason))}
        <div className='flex items-center'>{open ?(<FaCaretUp/>):(<FaCaretDown/>)}</div>
      </div>

      {open && (
       <div>
         <ul className='text-white bg-zinc-900 border border-none rounded-md lg:w-40 md:w-30 absolute  max-h-50 overflow-y-auto z-10 scrollbar-none'>
          {seasons.map((year) => (
           <div key={year} className='py-2 px-4 hover:bg-black'>
             <li
              onClick={() => {
                setSelectedSeason(year);
                setOpen(false);
              }} 
            >
              {formatSeason(year)}
            </li>
           </div>
          ))}
        </ul>
       </div>
      )}
    </div>
  );
}

export default Dropdown
